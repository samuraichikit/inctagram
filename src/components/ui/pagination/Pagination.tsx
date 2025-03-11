import { memo } from 'react'

import { useTranslation } from '@/common/hooks/useTranslation'
import { CustomSelect } from '@/components/ui/pagination/customSelect/CustomSelect'
import { NavigationBlock } from '@/components/ui/pagination/navigation-block'
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
    const { t } = useTranslation()

    const { t } = useTranslation()

    return (
      <div className={classes}>
        <NavigationBlock
          currentPage={currentPage}
          onPageChange={onPageChange}
          paginationRange={paginationRange}
        />
        <div className={s.selectBlock}>
          <Typography variant={'regular_text_14'}>{t.pagination.show}</Typography>
          <CustomSelect
            changeSelect={page => onPageSizeChange(Number(page))}
            className={s.Select}
            selectValue={String(pageSize)}
          />
          <Typography variant={'regular_text_14'}>{t.pagination.onPage}</Typography>
        </div>
      </div>
    )
  }
)
