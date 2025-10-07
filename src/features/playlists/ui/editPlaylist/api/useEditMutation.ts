import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SchemaUpdatePlaylistRequestPayload } from '~/shared/api/schema'
import { client } from '~/shared/api/client'
import { playlistKeys } from '~/shared/api/keysFactories/playlistsKeysFactory'
import { toast } from 'react-toastify'
import ToastMessageConfig from '~/shared/config/toastMessageConfig'
import { onError } from '~/shared/api/errorsVariant/errorsVariant'

type MutationVariables = {
	playlistId: string
} & Omit<SchemaUpdatePlaylistRequestPayload, 'tagIds'>

const useEditMutation = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (data: MutationVariables) => {
			const { playlistId, ...rest } = data
			const response = await client.PUT('/playlists/{playlistId}', {
				params: {
					path: {
						playlistId
					}
				},
				body: {
					...rest,
					tagIds: []
				}
			})
			return response.data
		},

		onError,
		onSuccess: () => {
			toast.success(ToastMessageConfig.SUCCESS_EDIT_PLAYLIST)
			queryClient.invalidateQueries({
				queryKey: playlistKeys.lists(),
				refetchType: 'all'
			})
		}
	})
}

export { useEditMutation }
