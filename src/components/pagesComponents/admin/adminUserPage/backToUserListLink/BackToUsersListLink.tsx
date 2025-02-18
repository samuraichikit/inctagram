import { ArrowLeftIcon } from '@/assets/icons/ArrowLeftIcon'
import { Typography } from '@/components/ui/typography'
import Link from 'next/link'

import s from './backToUsersListLink.module.scss'

export const BackToUsersListLink = () => {
  const classNames = {
    container: s.container,
  }

  return (
    <Link className={classNames.container} href={'#'}>
      <ArrowLeftIcon />
      <Typography variant={'medium_text_14'}>Back to Users List</Typography>
    </Link>
  )
}
