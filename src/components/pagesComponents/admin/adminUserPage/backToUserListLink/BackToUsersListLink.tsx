import { ArrowLeftIcon } from '@/assets/icons/ArrowLeftIcon'
import { useTranslation } from '@/common/hooks/useTranslation'
import { Typography } from '@/components/ui/typography'
import Link from 'next/link'

import s from './backToUsersListLink.module.scss'

export const BackToUsersListLink = () => {
  const classNames = {
    container: s.container,
  }
  const { t } = useTranslation()

  return (
    <Link className={classNames.container} href={'/admin/usersList'}>
      <ArrowLeftIcon />
      <Typography variant={'medium_text_14'}>{t.adminUserPage.backToUsersList}</Typography>
    </Link>
  )
}
