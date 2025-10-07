import { FC, useState } from 'react'
import { Pagination } from '~/shared/ui'
import { Link } from '@tanstack/react-router'
import { DeletePlaylist } from '~/features'
import { Loader } from '~/widgets'
import { usePlaylists } from '~/widgets/playlists/api/usePlaylists'
import { SchemaGetPlaylistsRequestPayload } from '~/shared/api/schema'

export type PlayListProps = {
	isSearchActive?: boolean
} & Pick<SchemaGetPlaylistsRequestPayload, 'userId'>

const Playlists: FC<PlayListProps> = ({ userId, isSearchActive }) => {
	const [pageNumber, setPageNumber] = useState(1)
	const [search, setSearch] = useState('')

	const { data, isLoading, isPending, isFetching } = usePlaylists({
		userId,
		search,
		pageNumber
	})

	return (
		<Loader isLoading={isLoading || isPending || isFetching}>
			<div className='w-full'>
				{isSearchActive && (
					<div>
						<input
							value={search}
							onChange={e => setSearch(e.target.value)}
							placeholder='Enter name'
						/>
					</div>
				)}
				{data?.data?.length ? (
					<>
						<ul className='!mb-2 w-full'>
							{data?.data.map(playlist => (
								<li
									key={playlist.id}
									className='flex item-center justify-between w-full gap-1'
								>
									<Link
										to='/my-playlists/$playlistId'
										disabled={!userId}
										params={{ playlistId: playlist.id }}
									>
										<p className='text-base'>{playlist.attributes.title}</p>
									</Link>
									{!!userId && <DeletePlaylist playlistId={playlist.id} />}
								</li>
							))}
						</ul>
						{data?.meta && (
							<Pagination
								current={pageNumber}
								pagesCount={data?.meta?.pagesCount}
								onChangePageNumber={page => setPageNumber(page)}
							/>
						)}
					</>
				) : (
					<p className='text-base text-silver'>List empty create new list</p>
				)}
			</div>
		</Loader>
	)
}

export default Playlists
