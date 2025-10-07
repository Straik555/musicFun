import s from './paginationNav.module.css'
import { getPaginationPages } from '~/shared/ui/pagination/utils/getPaginationPages'
import { FC } from 'react'
import { PaginationProps } from '~/shared/ui/pagination/pagination.type'

const SIBLING_COUNT = 1

export const PaginationNav: FC<PaginationProps> = ({
	current,
	pagesCount,
	onChangePageNumber
}) => {
	const pages = getPaginationPages(current, pagesCount, SIBLING_COUNT)

	return (
		<div className={s.pagination}>
			{pages.map((item, idx) =>
				item === '...' ? (
					<span className={s.ellipsis} key={`ellipsis-${idx}`}>
						...
					</span>
				) : (
					<button
						key={item}
						className={
							item === current
								? `${s.pageButton} ${s.pageButtonActive}`
								: s.pageButton
						}
						onClick={() => item !== current && onChangePageNumber(Number(item))}
						disabled={item === current}
						type='button'
					>
						{item}
					</button>
				)
			)}
		</div>
	)
}
