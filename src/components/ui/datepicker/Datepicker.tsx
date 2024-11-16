import React from 'react'

import { CalendarIcon } from '@/assets/icons/CalendarIcon'
import { Calendar } from '@/components/ui/datepicker/calendar/Calendar'
import { format } from 'date-fns'

import s from './datepicker.module.scss'

import { Popover, PopoverContent, PopoverTrigger } from '../popover/Popover'

export function Datepicker() {
  const [date, setDate] = React.useState<Date>()

  const handleDateChange = (date: any) => {
    setDate(date)
  }

  return (
    <Popover>
      <PopoverTrigger asChild className={s.datepicker_container}>
        <button type={'button'}>
          <CalendarIcon />
          {date ? format(date, 'dd/MM/yyyy') : <span>Pick a date</span>}
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar mode={'single'} onSelect={handleDateChange} selected={date} />
      </PopoverContent>
    </Popover>
  )
}
