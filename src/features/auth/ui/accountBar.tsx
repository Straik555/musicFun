import { FC } from 'react'
import LoginButton from './loginButton'
import { useMeQuery } from '~/features/auth/api/useMeQuery'
import CurrentUser from './currentUser/currentUser'
import { Loader } from '~/widgets'

const AccountBar: FC = () => {
	const { data: userData, isFetching, isLoading } = useMeQuery()

	return (
		<Loader isLoading={isLoading || isFetching}>
			<div>{!userData ? <LoginButton /> : <CurrentUser />}</div>
		</Loader>
	)
}

export default AccountBar
