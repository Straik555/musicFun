import { PaginationNav } from './pagination-nav/paginationNav'
import { FC } from 'react'
import { PaginationProps } from '~/shared/ui/pagination/pagination.type'

const Pagination: FC<PaginationProps> = props => {
	return (
		<div className='flex content-center items-center mx-auto my-0 gap-10'>
			<PaginationNav {...props} />
		</div>
	)
}

export default Pagination
