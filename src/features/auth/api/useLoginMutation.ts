import { useMutation, useQueryClient } from '@tanstack/react-query'
import { client } from '~/shared/api/client'
import { toast } from 'react-toastify'
import ToastMessageConfig from '~/shared/config/toastMessageConfig'
import { setCookiesToken } from '~/features/auth/api/cookiesFunction'
import { authKey } from '~/shared/api/keysFactories/authKeysFactory'

const callbackUrl = 'http://localhost:5173/oauth/callback'

const useLoginMutation = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: async ({ code }: { code: string }) => {
			const res = await client.POST('/auth/login', {
				body: {
					code,
					redirectUri: callbackUrl,
					rememberMe: true,
					accessTokenTTL: '10m'
				}
			})
			if (res.error) {
				toast.error(res.error.message || ToastMessageConfig.ERROR)
				throw new Error(res.error.message)
			}
			return res.data
		},
		onSuccess: data => {
			setCookiesToken(data.accessToken, data.refreshToken)
			toast.success(ToastMessageConfig.SUCCESS_LOGIN_USER)

			queryClient.invalidateQueries({
				queryKey: authKey.me()
			})
		}
	})

	return mutation
}

export { useLoginMutation, callbackUrl }
