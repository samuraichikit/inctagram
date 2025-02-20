import {
  Table,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/ui/tables'
import { Key, ReactNode } from 'react'
import { formatCellValue } from './formatCellValue'

export type Column<T> = {
  accessor: keyof T
  title: ReactNode
  sortable?: boolean
}

type Row<T> = T & { id: Key }
type TableBodyData<T> = Row<T>[]

type Props<T> = {
  columns: Column<T>[]
  tableBodyData: TableBodyData<T>
}

export const CommonTable = <T,>({ columns, tableBodyData }: Props<T>) => {
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
                return (
                  <TableBodyCell key={String(column.accessor)}>
                    {formattedValue as ReactNode}
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
