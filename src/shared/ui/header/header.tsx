import { FC, ReactNode } from 'react'
import { Link } from '@tanstack/react-router'

type HeaderProps = {
	renderAccountBar: ReactNode
}

const Header: FC<HeaderProps> = ({ renderAccountBar }) => {
	return (
		<header className='pb-2.5 border-b-[1px] border-solid border-[#aaaaaa]'>
			<div className='max-w-[900px] flex flex-row justify-between mx-auto'>
				<div className='flex gap-2.5'>
					<Link to='/'>Playlist</Link>
				</div>
				<div>{renderAccountBar}</div>
			</div>
		</header>
	)
}

export default Header
