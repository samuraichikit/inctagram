import { ReactNode } from 'react'

import { checkIsISODateString, formatDate } from '@/common/utils'

export const formatCellValue = (value: any): ReactNode => {
  if (typeof value === 'string' && checkIsISODateString(value)) {
    return formatDate(value)
  }

  return value
}
