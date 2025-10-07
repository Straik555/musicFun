import { useQuery } from '@tanstack/react-query'
import { useMeQuery } from '~/features/auth/api/useMeQuery'
import { playlistKeys } from '~/shared/api/keysFactories/playlistsKeysFactory'
import { client } from '~/shared/api/client'

const useEditQuery = (playlistId: string) => {
	const { data } = useMeQuery()
	return useQuery({
		queryKey: playlistKeys.myListDetails(playlistId),
		queryFn: async () => {
			const response = await client.GET('/playlists/{playlistId}', {
				params: { path: { playlistId } }
			})

			return response.data
		},
		enabled: !!playlistId && !!data,
		retry: 1
	})
}

export { useEditQuery }
