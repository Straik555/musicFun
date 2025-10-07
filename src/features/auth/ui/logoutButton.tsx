import { FC } from 'react'
import { useLogoutMutation } from '~/features/auth/api/useLogoutMutation'

const LogoutButton: FC = () => {
	const mutation = useLogoutMutation()
	const handleLogoutClick = () => {
		mutation.mutate()
	}
	return <button onClick={handleLogoutClick}>Log out</button>
}

export default LogoutButton
