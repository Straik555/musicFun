import { useMutation, useQueryClient } from '@tanstack/react-query'
import { client } from '~/shared/api/client'
import Cookies from 'js-cookie'
import { CookiesConfig } from '~/shared/config/cookiesConfig'
import { toast } from 'react-toastify'
import ToastMessageConfig from '~/shared/config/toastMessageConfig'
import { deleteCookies } from '~/features/auth/api/cookiesFunction'
import { authKey } from '~/shared/api/keysFactories/authKeysFactory'

const useLogoutMutation = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: async () => {
			const res = await client.POST('/auth/logout', {
				body: {
					refreshToken: Cookies.get(CookiesConfig.REFRESH_TOKEN)!
				}
			})
			return res.data
		},
		onSuccess: data => {
			deleteCookies()

			toast.info(ToastMessageConfig.SUCCESS_LOGOUT_USER)

			queryClient.resetQueries({
				queryKey: authKey.me()
			})
		}
	})

	return mutation
}

export { useLogoutMutation }
