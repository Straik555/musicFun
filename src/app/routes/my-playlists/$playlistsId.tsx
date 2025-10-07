import { createFileRoute } from '@tanstack/react-router'
import { EditPage } from '~pages'

export const Route = createFileRoute('/my-playlists/$playlistId')({
	component: EditPageLayout
})

function EditPageLayout() {
	const { playlistId } = Route.useParams()

	return <EditPage playlistId={playlistId} />
}
