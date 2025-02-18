import { ArrowLeftIcon } from '@/assets/icons/ArrowLeftIcon'
import { Typography } from '@/components/ui/typography'
import s from './backToUsersListLink.module.scss'
import Link from 'next/link'

export const BackToUsersListLink = () => {
  const classNames = {
    container: s.container,
  }
  return (
    <Link href={'#'} className={classNames.container}>
      <ArrowLeftIcon />
      <Typography variant="medium_text_14">Back to Users List</Typography>
    </Link>
  )
}
