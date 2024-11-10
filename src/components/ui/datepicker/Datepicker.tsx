import * as React from 'react'
import { DateRange } from 'react-day-picker'

import { CalendarIcon } from '@/assets/icons/Calendar'
import { Calendar } from '@/components/ui/calendar/Calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/cn'
import { addDays, format } from 'date-fns'

export function DatePickerWithRange({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  })

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover modal>
        <PopoverTrigger asChild>
          <button
            className={cn(
              'w-[360px] h-[36px] flex justify-between flex-row-reverse text-left items-center border pl-[11px] pr-[11px]',
              !date && 'text-muted-foreground'
            )}
            id={'date'}
            type={'button'}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'dd/MM/yyyy')} - {format(date.to, 'dd/MM/yyyy')}
                </>
              ) : (
                format(date.from, 'dd/MM/yyyy')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent align={'start'} className={'w-[300px] pl-0 flex'}>
          <Calendar
            defaultMonth={date?.from}
            mode={'range'}
            numberOfMonths={1}
            onSelect={setDate}
            selected={date}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
