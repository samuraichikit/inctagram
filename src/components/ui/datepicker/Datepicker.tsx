import React from 'react'

import { CalendarIcon } from '@/assets/icons/CalendarIcon'
import { Calendar } from '@/components/ui/datepicker/calendar/Calendar'

import s from './datepicker.module.scss'

import { Popover, PopoverContent, PopoverTrigger } from '../popover/Popover'

export function Datepicker() {
  return (
    <Popover>
      <PopoverTrigger asChild className={s.datepicker_container}>
        <button type={'button'}>
          <CalendarIcon />
          <span>Pick a date</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className={s.content}>
        <Calendar />
      </PopoverContent>
    </Popover>
  )
}
