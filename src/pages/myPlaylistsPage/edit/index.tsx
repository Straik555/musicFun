import { FC } from 'react'
import { EditPlaylistForm } from '~/features/index'

type EditPageProps = {
	playlistId: string
}

const EditPage: FC<EditPageProps> = ({ playlistId }) => {
	return (
		<div>
			<EditPlaylistForm playlistId={playlistId} />
		</div>
	)
}

export default EditPage
