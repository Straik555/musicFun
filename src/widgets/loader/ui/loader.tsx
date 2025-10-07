import React, { FC } from 'react'
import cn from 'classnames'
import LoaderIcon from './loader.svg'

type LoaderProps = {
	className?: string
	children?: React.ReactNode
	isLoading: boolean
}

const Loader: FC<LoaderProps> = ({ isLoading, children, className }) => {
	return (
		<>
			<div
				className={cn(
					'absolute top-0 left-0 z-10000 w-full justify-center items-center h-full bg-gray-500 opacity-25',
					className,
					{
						hidden: !isLoading,
						flex: isLoading
					}
				)}
			>
				<img src={LoaderIcon} />
			</div>
			{!isLoading && <>{children}</>}
		</>
	)
}

export default Loader
