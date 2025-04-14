import { DIGITS_COUNT } from '@/common/constants'
import { useTranslation } from '@/common/hooks/useTranslation'
import { Typography } from '@/components/ui/typography'
import { Card } from '@samuraichikit/inc-ui-kit'

import s from './totalUsers.module.scss'

type Props = {
  totalUsers: number
}

export const TotalUsers = ({ totalUsers }: Props) => {
  const classNames = {
    container: s.container,
    digit: s.digit,
    digitContainer: s.digitContainer,
    totalUsersCard: s.totalUsersCard,
  }
  const { t } = useTranslation()

  const totalUsersFormatted = totalUsers.toString().padStart(DIGITS_COUNT, '0').split('')

  return (
    <Card className={classNames.container}>
      <Typography asChild variant={'h2'}>
        <h2>{t.publicPosts.registeredUsers}:</h2>
      </Typography>
      <Card className={classNames.totalUsersCard}>
        {totalUsersFormatted.map((digit, index) => {
          return (
            <Typography className={classNames.digitContainer} key={index} variant={'h2'}>
              <span className={classNames.digit}>{digit}</span>
            </Typography>
          )
        })}
      </Card>
    </Card>
  )
}
