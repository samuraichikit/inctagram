import { ArrowLeftIcon } from '@/assets/icons/ArrowLeftIcon'
import { Typography } from '@/components/ui/typography'
import s from './backToUsersListLink.module.scss'

export const BackToUsersListLink = () => {
  const classNames = {
    container: s.container,
  }
  return (
    <div className={classNames.container}>
      <ArrowLeftIcon />
      <Typography variant="medium_text_14">Back to Users List</Typography>
    </div>
  )
}
