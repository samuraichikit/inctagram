import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import clsx from 'clsx'

import s from './table.module.scss'

export const Table = forwardRef<ElementRef<'table'>, ComponentPropsWithoutRef<'table'>>(
  ({ className, ...rest }, ref) => {
    const classNames = {
      table: clsx(s.table, className),
    }

    return <table className={classNames.table} {...rest} ref={ref} />
  }
)

export const TableHead = forwardRef<ElementRef<'thead'>, ComponentPropsWithoutRef<'thead'>>(
  ({ className, ...rest }, ref) => {
    const classNames = {
      tableHead: className,
    }

    return <thead className={classNames.tableHead} {...rest} ref={ref} />
  }
)

export const TableBody = forwardRef<ElementRef<'tbody'>, ComponentPropsWithoutRef<'tbody'>>(
  ({ className, ...rest }, ref) => {
    const classNames = {
      tableBody: className,
    }

    return <tbody className={classNames.tableBody} {...rest} ref={ref} />
  }
)

export const TableRow = forwardRef<ElementRef<'tr'>, ComponentPropsWithoutRef<'tr'>>(
  ({ className, ...rest }, ref) => {
    const classNames = {
      tableRow: className,
    }

    return <tr className={classNames.tableRow} {...rest} ref={ref} />
  }
)

export const TableHeadCell = forwardRef<ElementRef<'th'>, ComponentPropsWithoutRef<'th'>>(
  ({ className, ...rest }, ref) => {
    const classNames = {
      tableHeadCell: clsx(s.tableHeadCell, className),
    }

    return <th className={classNames.tableHeadCell} {...rest} ref={ref} />
  }
)

export const TableBodyCell = forwardRef<ElementRef<'td'>, ComponentPropsWithoutRef<'td'>>(
  ({ className, ...rest }, ref) => {
    const classNames = {
      tableBodyCell: clsx(s.tableBodyCell, className),
    }

    return <td className={classNames.tableBodyCell} {...rest} ref={ref} />
  }
)
