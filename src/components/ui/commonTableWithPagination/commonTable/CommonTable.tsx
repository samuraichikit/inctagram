import { Key, ReactNode } from 'react'

import { SortArrow } from '@/assets/icons/SortArrow'
import { SortDirection } from '@/services/admin/types'
import {
  Table,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@samuraichikit/inc-ui-kit'
import clsx from 'clsx'
import Link from 'next/link'

import s from './commonTable.module.scss'

import { Typography } from '../../typography'
import { formatCellValue } from './formatCellValue'

export type Column<T> =
  | {
      accessor: keyof T
      href: (row: T) => string
      isLink?: true
      sortable?: boolean
      title: ReactNode
    }
  | {
      accessor: keyof T
      isLink?: false
      sortable?: boolean
      title: ReactNode
    }

type Row<T> = { id: Key } & T
type TableBodyData<T> = Row<T>[]

export type CommonTableProps<T> = {
  columns: Column<T>[]
  onChangeSort?: (sortColumn: keyof T, sortDirection: SortDirection) => void
  sortColumn?: keyof T
  sortDirection?: SortDirection
  tableBodyData: TableBodyData<T>
}

export const CommonTable = <T,>({
  columns,
  onChangeSort,
  sortColumn,
  sortDirection,
  tableBodyData,
}: CommonTableProps<T>) => {
  const classNames = {
    activeSortAsc: (accessor: keyof T) =>
      clsx(sortDirection === SortDirection.Asc && accessor === sortColumn && s.activeSortAsc),
    arrowsContainer: s.arrowsContainer,
    columnTitleContainer: (sortable: boolean = false) =>
      clsx(s.columnTitleContainer, sortable && s.sortableColumn),
    link: s.link,
    sortArrowDown: (accessor: keyof T) =>
      clsx(
        s.sortArrowDown,
        sortDirection === SortDirection.Desc && accessor === sortColumn && s.activeSortDesc
      ),
  }

  const handleChangeSort = (field: Column<T>['accessor']) => () => {
    const newSortOrder =
      field === sortColumn && sortDirection === SortDirection.Desc
        ? SortDirection.Asc
        : SortDirection.Desc

    onChangeSort?.(field, newSortOrder)
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns.map(column => {
            const { accessor, isLink, sortable, title } = column

            if (sortable) {
              return (
                <TableHeadCell key={String(accessor)}>
                  <div
                    className={classNames.columnTitleContainer(sortable)}
                    onClick={handleChangeSort(accessor)}
                  >
                    {title}
                    {sortable && (
                      <div className={classNames.arrowsContainer}>
                        <SortArrow className={classNames.activeSortAsc(accessor)} />
                        <SortArrow className={classNames.sortArrowDown(accessor)} />
                      </div>
                    )}
                  </div>
                </TableHeadCell>
              )
            }

            return <TableHeadCell key={String(accessor)}>{title}</TableHeadCell>
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {tableBodyData.map(row => {
          return (
            <TableRow key={row.id}>
              {columns.map(column => {
                const { accessor, isLink } = column
                const cellValue = row[accessor as keyof typeof row]
                const formattedValue = formatCellValue(cellValue)
                const href = isLink && column.href ? column.href(row) : undefined

                return (
                  <TableBodyCell key={String(column.accessor)}>
                    {column.isLink && href ? (
                      <Typography asChild className={classNames.link} variant={'regular_link'}>
                        <Link href={href}>{formattedValue as ReactNode}</Link>
                      </Typography>
                    ) : (
                      <Typography>{formattedValue as ReactNode}</Typography>
                    )}
                  </TableBodyCell>
                )
              })}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
