import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import TimeAgo from 'react-timeago'

import { Typography } from '@samuraichikit/inc-ui-kit'
import { useRouter } from 'next/router'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import enStrings from 'react-timeago/lib/language-strings/en'
import ruStrings from 'react-timeago/lib/language-strings/ru'

type Props = {
  className?: string
  date: string
}

export const TimeAgoDisplay = ({ className, date }: Props) => {
  const classNames = {
    timeAgo: className,
  }

  const [isClient, setIsClient] = useState(false)

  const router = useRouter()
  const { locale } = router

  const enFormatter = buildFormatter(enStrings)
  const ruFormatter = buildFormatter(ruStrings)

  const formatter = locale === 'ru' ? ruFormatter : enFormatter

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <Skeleton height={16} width={65} />
  }

  return (
    <Typography className={classNames.timeAgo} variant={'small_text'}>
      <TimeAgo date={date} formatter={formatter} />
    </Typography>
  )
}
