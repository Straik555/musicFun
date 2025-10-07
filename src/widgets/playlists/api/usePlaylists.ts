import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { client } from '~/shared/api/client'
import ToastMessageConfig from '~/shared/config/toastMessageConfig'
import { toast } from 'react-toastify'
import { playlistKeys } from '~/shared/api/keysFactories/playlistsKeysFactory'
import { SchemaGetPlaylistsRequestPayload } from '~/shared/api/schema'

export const usePlaylists = ({
	pageNumber,
	search,
	userId
}: Pick<
	SchemaGetPlaylistsRequestPayload,
	'search' | 'pageNumber' | 'userId'
>) => {
	const key = userId
		? playlistKeys.myList(userId)
		: playlistKeys.list({ pageNumber, search })

	const query = userId
		? { userId }
		: {
				pageNumber,
				search
			}

	const { isPending, isLoading, isFetching, data, error, isError } = useQuery({
		queryKey: key,
		queryFn: async ({ signal }) => {
			const res = await client.GET('/playlists', {
				params: {
					query
				},
				signal
			})
			if (res.error) {
				throw new Error(ToastMessageConfig.ERROR)
			}
			return res.data
		},
		placeholderData: keepPreviousData
	})

	if (isError) {
		toast.error(
			error.message ? JSON.stringify(error.message) : ToastMessageConfig.ERROR
		)
	}

	return { data, isLoading, isPending, isFetching }
}
