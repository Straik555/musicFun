import createClient, { type Middleware } from 'openapi-fetch'
import type { paths } from '~/shared/api/schema'
import Cookies from 'js-cookie'
import { CookiesConfig } from '~/shared/config/cookiesConfig'
import { setCookiesToken } from '~/features/auth/api/cookiesFunction'
import { apiKey, baseUrl } from '~/shared/config/apiConfig'

let refreshPromise: Promise<void> | null = null

const makeRefreshToken = () => {
	if (!refreshPromise) {
		refreshPromise = (async (): Promise<void> => {
			const refreshToken = Cookies.get(CookiesConfig.REFRESH_TOKEN)
			if (!refreshToken) throw new Error('Refresh token not set')

			const response = await fetch(baseUrl + 'auth/refresh', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'api-key': apiKey
				},
				body: JSON.stringify({ refreshToken })
			})

			if (!response.ok) {
				Cookies.remove(CookiesConfig.REFRESH_TOKEN)
				Cookies.remove(CookiesConfig.ACCESS_TOKEN)
				throw new Error('Refresh token failed!')
			}

			const data = await response.json()

			setCookiesToken(data.accessToken, data.refreshToken)
		})()

		refreshPromise.finally(() => {
			refreshPromise = null
		})

		return refreshPromise
	}
}

const authMiddleware: Middleware = {
	onRequest({ request, options }) {
		const accessToken = Cookies.get(CookiesConfig.ACCESS_TOKEN)

		if (accessToken) {
			request.headers.set('Authorization', 'Bearer ' + accessToken)
		}

		// @ts-ignore  hot fix
		request._retryRequest = request.clone()
		return request
	},
	async onResponse({ response, request }) {
		if (response.ok) return response
		if (!response.ok && response.status !== 401) {
			throw await response.json()
		}
		try {
			await makeRefreshToken()

			// @ts-ignore
			const originalRequest: Request = request._retryRequest

			const retryRequest = new Request(originalRequest, {
				headers: new Headers(originalRequest.headers)
			})

			retryRequest.headers.set(
				'Authorization',
				'Bearer ' + Cookies.get(CookiesConfig.ACCESS_TOKEN)
			)

			return fetch(retryRequest)
		} catch {
			return response
		}
	}
}

const client = createClient<paths>({
	baseUrl,
	headers: {
		'api-key': apiKey
	}
})

client.use(authMiddleware)

export { client, baseUrl }
