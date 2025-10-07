import { FC } from 'react'
import { useMeQuery } from '~/features/auth/api/useMeQuery'
import { AddPlayListForm } from '~/features'
import { Loader, Playlists } from '~/widgets'
import { Navigate } from '@tanstack/react-router'

const MyPlaylistsPage: FC = () => {
	const { data, isPending, isLoading } = useMeQuery()

	if (!data && (!isPending || !isLoading)) {
		return <Navigate to='/' replace />
	}

	return (
		<Loader isLoading={isPending || isLoading}>
			<div className='w-full'>
				<h2>My playlist</h2>
				<AddPlayListForm />
				<Playlists userId={data?.userId} />
			</div>
		</Loader>
	)
}

export default MyPlaylistsPage
