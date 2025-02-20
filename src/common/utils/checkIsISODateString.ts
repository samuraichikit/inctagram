import { ISO_DATE_REGEX } from '../constants'

export const checkIsISODateString = (dateString: string) => {
  return ISO_DATE_REGEX.test(dateString)
}
