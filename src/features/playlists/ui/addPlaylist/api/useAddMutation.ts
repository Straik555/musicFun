import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SchemaCreatePlaylistRequestPayload } from '~/shared/api/schema'
import { client } from '~/shared/api/client'
import { playlistKeys } from '~/shared/api/keysFactories/playlistsKeysFactory'
import { onError } from '~/shared/api/errorsVariant/errorsVariant'

const useAddMutation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (data: SchemaCreatePlaylistRequestPayload) => {
			const response = await client.POST('/playlists', {
				body: data
			})

			return response.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: playlistKeys.lists(),
				refetchType: 'all'
			})
		},
		onError
	})
}

export { useAddMutation }
