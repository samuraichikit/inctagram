import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

type Props = {
  totalUsers: number
}

export const TotalUsers = ({ totalUsers }: Props) => {
  const DIGITS_COUNT = 6
  const totalUsersFormatted = totalUsers.toString().padStart(DIGITS_COUNT, '0').split('')

  return (
    <Card>
      <Typography asChild variant={'h2'}>
        <h2>Registered users:</h2>
      </Typography>
      <Card>
        <Typography variant={'h2'}>
          {totalUsersFormatted.map((digit, index) => {
            return <span key={index}>{digit}</span>
          })}
        </Typography>
      </Card>
    </Card>
  )
}
