import { checkIsISODateString, formatDate } from '@/common/utils'
import { ReactNode } from 'react'

export const formatCellValue = (value: any): ReactNode => {
  if (typeof value === 'string' && checkIsISODateString(value)) {
    return formatDate(value)
  }
  return value
}
