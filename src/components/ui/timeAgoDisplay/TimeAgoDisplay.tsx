import TimeAgo from 'react-timeago'

import { useRouter } from 'next/router'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import enStrings from 'react-timeago/lib/language-strings/en'
import ruStrings from 'react-timeago/lib/language-strings/ru'

import { Typography } from '../typography'

type Props = {
  className?: string
  date: string
}

export const TimeAgoDisplay = ({ className, date }: Props) => {
  const classNames = {
    timeAgo: className,
  }

  const router = useRouter()
  const { locale } = router

  const enFormatter = buildFormatter(enStrings)
  const ruFormatter = buildFormatter(ruStrings)

  const formatter = locale === 'ru' ? ruFormatter : enFormatter

  return (
    <Typography className={classNames.timeAgo} variant={'small_text'}>
      <TimeAgo date={date} formatter={formatter} />
    </Typography>
  )
}
