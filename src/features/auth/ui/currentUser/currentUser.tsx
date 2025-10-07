import { FC } from 'react'
import { Link } from '@tanstack/react-router'
import { useMeQuery } from '~/features/auth/api/useMeQuery'
import LogoutButton from '~/features/auth/ui/logoutButton'

const CurrentUser: FC = () => {
	const { data: userData } = useMeQuery()
	return !userData ? (
		<span>...No user</span>
	) : (
		<div className='flex gap-2.5'>
			<Link to='/my-playlists' activeOptions={{ exact: true }}>
				{userData!.login}
			</Link>
			<LogoutButton />
		</div>
	)
}

export default CurrentUser
