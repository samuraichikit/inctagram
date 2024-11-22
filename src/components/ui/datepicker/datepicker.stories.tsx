import type { Meta, StoryObj } from '@storybook/react'

import React from 'react'
import { DateRange } from 'react-day-picker'

import { CalendarIcon } from '@/assets/icons/CalendarIcon'
import { Datepicker } from '@/components/ui/datepicker/Datepicker'
import { Calendar } from '@/components/ui/datepicker/calendar/Calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'

import s from '@/components/ui/datepicker/datepicker.module.scss'

const meta = {
  argTypes: {},
  component: Datepicker,
  tags: ['autodocs'],
  title: 'Components/Datepicker',
} satisfies Meta<typeof Datepicker>

export default meta
type Story = StoryObj<typeof meta>

export const Def: Story = {}

const CalendarSingle = () => {
  const [date, setDate] = React.useState<Date>()

  const handleDateChange = (date: Date | undefined) => {
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
      <PopoverContent className={s.content}>
        <Calendar mode={'single'} onSelect={handleDateChange} selected={date} />
      </PopoverContent>
    </Popover>
  )
}

const CalendarRange = () => {
  const [range, setRange] = React.useState<DateRange>({
    from: undefined,
    to: undefined,
  })

  const handleDayClick = (day: DateRange) => {
    if (range.from && range.to) {
      setRange({ from: day.from, to: undefined })
    } else if (!range.from) {
      setRange({ from: day.from, to: undefined })
    } else {
      setRange(current => ({ ...current, to: day.to }))
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild className={s.datepicker_container}>
        <button type={'button'}>
          <CalendarIcon />
          {range?.from ? (
            <>
              {range.to
                ? `${format(range.from, 'dd/MM/yyyy')} - ${format(range.to, 'dd/MM/yyyy')}`
                : format(range.from, 'dd/MM/yyyy')}
            </>
          ) : (
            <span>Pick a date</span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className={s.content}>
        <Calendar mode={'range'} onSelect={handleDayClick} required selected={range} />
      </PopoverContent>
    </Popover>
  )
}

export const Single: Story = {
  render: () => <CalendarSingle />,
}

export const Range: Story = {
  render: () => <CalendarRange />,
}
