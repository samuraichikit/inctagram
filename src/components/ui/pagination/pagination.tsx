import { memo } from 'react'

import { NavigationBlock } from '@/components/ui/pagination/navigation-block'
import { PageSizeSelect } from '@/components/ui/pagination/page-size-select/page-size-select'
import { usePagination } from '@/components/ui/pagination/usePagination'
import { Typography } from '@/components/ui/typography'
import clsx from 'clsx'

import s from './pagination.module.scss'

export type PaginationProps = {
  className?: string
  currentPage: number
  onPageChange: (newPage: number) => void
  onPageSizeChange: (newPageSize: number) => void
  pageSize: number
  siblingCount?: number
  totalCount?: number
}

export const Pagination = memo(
  ({
    className,
    currentPage,
    onPageChange,
    onPageSizeChange,
    pageSize,
    siblingCount,
    totalCount = 10,
  }: PaginationProps) => {
    const classes = clsx(s.root, className)

    const paginationRange = usePagination({
      currentPage,
      pageSize,
      siblingCount,
      totalCount,
    })

    if (currentPage === 0 || paginationRange.length < 2) {
      return null
    }

    return (
      <div className={classes}>
        <NavigationBlock
          currentPage={currentPage}
          onPageChange={onPageChange}
          paginationRange={paginationRange}
        />
        <div className={s.selectBlock}>
          <Typography variant={'regular_text_14'}>Show</Typography>
          <PageSizeSelect onPageSizeChange={onPageSizeChange} pageSize={pageSize} />
          <Typography variant={'regular_text_14'}>on page</Typography>
        </div>
      </div>
    )
  }
)
