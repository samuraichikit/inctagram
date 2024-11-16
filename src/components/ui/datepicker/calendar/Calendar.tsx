import * as React from 'react'
import { DayPicker } from 'react-day-picker'

import { clsx } from 'clsx'
import { enIN, ru } from 'date-fns/locale'

import s from './calendar.module.scss'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, ...props }: CalendarProps) {
  const modifiers = {
    weekend: (date: Date) => {
      const day = date.getDay() // Получаем день недели

      return day === 0 || day === 6 // Возвращаем true для воскресенья (0) и субботы (6)
    },
  }

  return (
    <div>
      <DayPicker
        className={clsx(s.datepicker, className)}
        classNames={{
          button_next: s.button_next,
          button_previous: s.button_prev,
          caption: s.caption,
          caption_label: s.caption_label,
          day: s.day,
          day_disabled: s.day_disabled,
          day_hidden: s.day_hidden,
          day_outside: s.day_outside,
          month_grid: s.month_grid,
          nav_button: s.nav_button,
          range_end: s.day_range_end,
          range_middle: s.day_range_middle,
          range_start: s.day_range_start,
          row: s.row,
          selected: s.day_selected,
          today: s.day_today,
          week: s.week,
          weekday: s.weekday,
          ...classNames,
        }}
        locale={enIN}
        mode={'single'}
        modifiers={modifiers}
        modifiersClassNames={{
          weekend: s.weekend, // Класс, который будет применяться к выходным дням
        }}
        showOutsideDays
        {...props}
      />
    </div>
  )
}

Calendar.displayName = 'Calendar'

export { Calendar }
