'use client'
import * as React from 'react'
import { DayPicker } from 'react-day-picker'

import { ArrowRightIcon } from '@/assets/icons/ArrowRightIcon'
import { cn } from '@/lib/cn'
import { ru } from 'date-fns/locale'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  const modifiers = {
    weekend: (date: Date) => {
      const day = date.getDay() // Получаем день недели

      return day === 0 || day === 6 // Возвращаем true для воскресенья (0) и субботы (6)
    },
  }

  return (
    <DayPicker
      className={cn('p-0', className)}
      classNames={{
        button_next: 'absolute right-1',
        button_previous: 'absolute left-1',
        caption: 'flex justify-between items-center',
        caption_label: 'font-bold leading-6 text-[#FFFFFF] pl-[8px]',
        cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
        day: cn(
          'h-9 w-9 p-0 font-bold leading-6 ',
          'hover:bg-[#2F68CC] rounded-[50%]',
          'active:bg-[#234E99]',
          'transition-color transition-bg duration-300 ease-in-out'
        ),
        day_disabled: 'text-[#8D9094]',
        day_hidden: 'invisible',
        day_outside: 'day-outside text-[#8D9094] aria-selected:bg-[#234E99]/50',
        day_range_end: 'day-range-end rounded-l-none',
        day_range_middle: 'rounded-l-none',
        day_selected: 'bg-[#234E99]',
        day_today:
          'text-[#397DF6] font-bold leading-6 !font-bold aria-selected:text-[#FFFFFF] hover:text-[#73A5FF]',
        head_cell:
          'text-[#8D9094]  rounded-md w-9 font-normal text-base font-normal leading-6 py-[10px]',
        head_row: 'flex',
        month: 'space-y-4',
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 w-full',

        nav: 'space-x-1 flex items-center',

        nav_button: cn(
          `flex justify-center items-center h-[36px] w-[36px] outline-none `,
          'bg-[#4C4C4C] rounded-full border-2 border-transparent',
          `duration-300 transition-bg transition-border`,
          `hover:bg-[#333333] active:bg-[#8D9094]`,
          `focus-visible:border-[#397DF6]`
        ),
        row: 'flex w-full mt-2',
        table: 'w-full border-collapse space-y-1',
        ...classNames,
      }}
      components={{
        NextMonthButton: () => <ArrowRightIcon className={'h-4 w-4 mb-[1px]'} />,
        PreviousMonthButton: () => <ArrowRightIcon className={'h-4 w-4 rotate-180'} />,
      }}
      locale={ru}
      modifiers={modifiers}
      modifiersClassNames={{
        weekend: 'text-[#F23D61]', // Класс, который будет применяться к выходным дням
      }}
      showOutsideDays={showOutsideDays}
      {...props}
    />
  )
}

Calendar.displayName = 'Calendar'

export { Calendar }
