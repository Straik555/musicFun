import { FC } from 'react'
import { useDeleteMutation } from '~/features/playlists/ui/deletePlaylist/api/useDeleteMutation'
import { Loader } from '~/widgets'

type DeletePlaylistProps = {
	playlistId: string
}

const DeletePlaylist: FC<DeletePlaylistProps> = ({ playlistId }) => {
	const { mutate, isPending, isSuccess } = useDeleteMutation()

	const handleDeleteClick = () => {
		mutate(playlistId)
	}

	return (
		<Loader isLoading={isPending || isSuccess}>
			<button onClick={handleDeleteClick} className='text-sm'>
				Delete
			</button>
		</Loader>
	)
}

export default DeletePlaylist
