import { useMutation, useQueryClient } from '@tanstack/react-query'
import { client } from '~/shared/api/client'
import { toast } from 'react-toastify'
import ToastMessageConfig from '~/shared/config/toastMessageConfig'
import { playlistKeys } from '~/shared/api/keysFactories/playlistsKeysFactory'
import { onError } from '~/shared/api/errorsVariant/errorsVariant'

export const useDeleteMutation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (playlistId: string) => {
			const response = await client.DELETE('/playlists/{playlistId}', {
				params: {
					path: { playlistId }
				}
			})
			return response.data
		},
		onSuccess: (_, playlistId) => {
			toast.success(ToastMessageConfig.SUCCESS_DELETE_PLAYLIST)
			queryClient.removeQueries({
				queryKey: playlistKeys.myListDetails(playlistId)
			})
			queryClient.invalidateQueries({
				queryKey: playlistKeys.lists(),
				refetchType: 'all'
			})
		},
		onError
	})
}
