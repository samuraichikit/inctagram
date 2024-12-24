import React from 'react'

import { CalendarIcon } from '@/assets/icons/CalendarIcon'
import { Calendar } from '@/components/ui/datepicker/calendar/Calendar'
import { formatDate } from 'date-fns'

import s from './datepicker.module.scss'

import { Popover, PopoverContent, PopoverTrigger } from '../popover/Popover'

type Props = {
  onChange: (date: string | undefined) => void
  value: Date | undefined
}

export function Datepicker({ onChange, value }: Props) {
  const selectHandler = (date: Date | undefined) => {
    if (date) {
      onChange(formatDate(date, 'yyyy-MM-dd'))
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild className={s.datepicker_container}>
        <button type={'button'}>
          <CalendarIcon />
          <span>{value !== undefined ? formatDate(value, 'dd/MM/yyyy') : '00.00.0000'}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className={s.content}>
        <Calendar mode={'single'} onSelect={selectHandler} selected={value} />
      </PopoverContent>
    </Popover>
  )
}
