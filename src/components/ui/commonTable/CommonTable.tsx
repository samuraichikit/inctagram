import { Key, ReactNode } from 'react'

import {
  Table,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/ui/tables'
import Link from 'next/link'

import s from './commonTable.module.scss'

import { Typography } from '../typography'
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

type Props<T> = {
  columns: Column<T>[]
  tableBodyData: TableBodyData<T>
}

export const CommonTable = <T,>({ columns, tableBodyData }: Props<T>) => {
  const classNames = {
    link: s.link,
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns.map(column => {
            return <TableHeadCell key={String(column.accessor)}>{column.title}</TableHeadCell>
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {tableBodyData.map(row => {
          return (
            <TableRow key={row.id}>
              {columns.map(column => {
                const cellValue = row[column.accessor as keyof typeof row]
                const formattedValue = formatCellValue(cellValue)
                const href = column.isLink && column.href ? column.href(row) : undefined

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
