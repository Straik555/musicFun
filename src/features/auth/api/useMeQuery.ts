import { useQuery } from '@tanstack/react-query'
import { client } from '~/shared/api/client'
import { authKey } from '~/shared/api/keysFactories/authKeysFactory'

export const useMeQuery = () =>
	useQuery({
		queryKey: authKey.me(),
		queryFn: async () => {
			const clientResponse = await client.GET('/auth/me')
			return clientResponse.data
		},
		retry: false
	})
