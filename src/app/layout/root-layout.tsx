import { Outlet } from '@tanstack/react-router'
import { AccountBar } from '~/features'
import { Header, ToastMessage } from '~/shared/ui'

export const RouteLayout = () => (
	<>
		<Header renderAccountBar={<AccountBar />} />
		<div className='max-w-[900px] flex flex-row justify-between mx-auto'>
			<Outlet />
		</div>
		<ToastMessage />
	</>
)
