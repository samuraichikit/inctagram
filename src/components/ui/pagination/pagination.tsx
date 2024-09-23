import { memo } from 'react'
import { clsx } from 'clsx'
import s from './pagination.module.scss'
import { Typography } from '@/components/ui/typography'
import { usePagination } from '@/components/ui/pagination/usePagination'
import { NavigationBlock } from '@/components/ui/pagination/navigation-block'

export type PaginationProps = {
  totalCount?: number
  currentPage: number
  onPageChange: (newPage: number) => void
  pageSize: number
  onPageSizeChange: (newPageSize: number) => void
  siblingCount?: number
  className?: string
}

export const Pagination = memo(
  ({
    totalCount = 10,
    currentPage,
    onPageChange,
    pageSize,
    siblingCount,
    className,
  }: PaginationProps) => {
    const classes = clsx(s.root, className)

    const paginationRange = usePagination({
      currentPage,
      totalCount,
      siblingCount,
      pageSize,
    })

    if (currentPage === 0 || paginationRange.length < 2) {
      return null
    }

    return (
      <div className={classes}>
        <NavigationBlock
          paginationRange={paginationRange}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
        <div className={s.selectBlock}>
          <Typography variant="regular_text_14">Show</Typography>
          <select />
          <Typography variant="regular_text_14">the page</Typography>
        </div>
      </div>
    )
  }
)
