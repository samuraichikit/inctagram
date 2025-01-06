import { memo, useState } from 'react'

import { CustomSelect } from '@/components/ui/pagination/customSelect/CustomSelect'
import { NavigationBlock } from '@/components/ui/pagination/navigation-block'
import { PageSizeSelect } from '@/components/ui/pagination/page-size-select/page-size-select'
import { usePagination } from '@/components/ui/pagination/usePagination'
import { Typography } from '@/components/ui/typography'
import clsx from 'clsx'

import s from './pagination.module.scss'

export type PaginationProps = {
  className?: string
  currentPage: number
  getPageSize: (value: number) => void
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
    getPageSize,
    onPageChange,
    onPageSizeChange,
    pageSize,
    siblingCount,
    totalCount = 10,
  }: PaginationProps) => {
    const classes = clsx(s.root, className)

    const [selectValue, setSelectValue] = useState('5')

    const changeSelect = (value: string) => {
      getPageSize(Number(value))
      setSelectValue(value)
    }

    const paginationRange = usePagination({
      currentPage,
      pageSize,
      siblingCount,
      totalCount,
    })

    if (currentPage === 0 || paginationRange.length < 2) {
      return (
        <div className={s.wrapperShowPage}>
          <Typography variant={'regular_text_14'}>Show</Typography>
          {/*<PageSizeSelect onPageSizeChange={onPageSizeChange} pageSize={pageSize} />*/}
          <CustomSelect
            changeSelect={changeSelect}
            className={s.Select}
            selectValue={selectValue}
          />
          <Typography variant={'regular_text_14'}>on page</Typography>
        </div>
      )
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
          {/*<PageSizeSelect onPageSizeChange={onPageSizeChange} pageSize={pageSize} />*/}
          <CustomSelect
            changeSelect={changeSelect}
            className={s.Select}
            selectValue={selectValue}
          />
          <Typography variant={'regular_text_14'}>on page</Typography>
        </div>
      </div>
    )
  }
)
