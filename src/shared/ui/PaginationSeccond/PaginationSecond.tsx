import React, { FC } from 'react'
import { PaginationType } from './PaginationSecond.type'
import PaginationItem from './PaginationItem'
import { useMotionValue } from 'framer-motion'

// <PaginationSecond
// page={currentPage}
// totalCount={getPageCount(query.data?.meta.pagesCount, 1)}
// onClickItem={page => setCurrentPage(page)}
// onClickNext={() => setCurrentPage(prev => prev + 1)}
// onClickPrevious={() => setCurrentPage(prev => prev - 1)}
// />

const getPageCount = (count: number, limit: number): number[] => {
	return [...Array(Math.ceil(count / limit))].map((_, id) => ++id)
}

const PaginationSecond: FC<PaginationType> = ({
	totalCount,
	page,
	onClickPrevious,
	onClickNext,
	onClickItem
}) => {
	const newCount = totalCount.reduce(
		(prev: (number | string)[], cur: number, id: number, array) => {
			const startGap = page > 3 && page <= 6 ? ['...'] : []
			const endGap = page < 6 && page <= 3 ? ['...'] : []
			const start =
				page > 3 && page <= 6
					? [...array.slice(0, 1), '...']
					: page <= 3
						? [...array.slice(0, 1)]
						: page > 3 && page <= 7
							? [...array.slice(0, 2), '...']
							: page > 7
								? [...array.slice(0, 3), '...']
								: []
			const mid = [
				...array.slice(
					page > 2
						? page - (page === array.length ? 3 : 2)
						: page === 1
							? 1
							: page - 1,
					page +
						(page + 1 >= Math.ceil(array.length / 2) ? 1 : page >= 3 ? 1 : 2)
				),
				...startGap
			]
			const end = [
				...endGap,
				...(page > 3 && page <= 6
					? array.slice(array.length - 1)
					: page >= 7
						? array.slice(page + 1)
						: array.slice(array.length - (page === 1 ? 3 : 2)))
			]
			return totalCount.length > 7 ? [...start, ...mid, ...end] : [...prev, cur]
		},
		[]
	)

	const mouseX = useMotionValue(Infinity)

	return (
		<div
			className='flex items-center justify-center my-4 mx-auto box-content h-14'
			onMouseMove={e => mouseX.set(e.pageX)}
			onMouseLeave={() => mouseX.set(Infinity)}
		>
			<PaginationItem
				hover={page === 1}
				isCurrentLock={page === 1}
				title='<'
				onClick={onClickPrevious}
				mouseX={mouseX}
			/>

			{newCount.map((count, id) => (
				<PaginationItem
					key={id}
					hover={page === count}
					title={count}
					onClick={() => {
						if (typeof count === 'number') {
							onClickItem(count)
						}
					}}
					mouseX={mouseX}
				/>
			))}
			<PaginationItem
				hover={page === totalCount.length}
				title='>'
				onClick={onClickNext}
				mouseX={mouseX}
			/>
		</div>
	)
}

export default PaginationSecond
