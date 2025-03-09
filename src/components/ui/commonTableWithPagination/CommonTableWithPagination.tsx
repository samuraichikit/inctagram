import { useTranslation } from '@/common/hooks/useTranslation'

import s from './commonTableWithPagination.module.scss'

import { Pagination, PaginationProps } from '../pagination'
import { Typography } from '../typography'
import { CommonTable, CommonTableProps } from './commonTable'

type Props<T> = CommonTableProps<T> & PaginationProps

export const CommonTableWithPagination = <T,>({ columns, tableBodyData, ...rest }: Props<T>) => {
  const classNames = {
    pagination: s.pagination,
    text: s.text,
  }

  const { t } = useTranslation()

  const isEmptyArray = tableBodyData.length === 0

  if (isEmptyArray) {
    return (
      <Typography className={classNames.text} variant={'bold_text_16'}>
        {t.commonTableWithPagination.noData}
      </Typography>
    )
  }

  return (
    <>
      <CommonTable columns={columns} tableBodyData={tableBodyData} />
      <Pagination className={classNames.pagination} {...rest} />
    </>
  )
}
