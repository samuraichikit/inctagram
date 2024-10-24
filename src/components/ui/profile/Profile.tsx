import { useGetProfileQuery } from '@/services/profile'

import s from './profile.module.scss'

import { Typography } from '../typography'

export const Profile = () => {
  const { data } = useGetProfileQuery()

  return (
    <div className={s.profileWrapper}>
      <Typography variant={'h1'}>{data?.userName}</Typography>
    </div>
  )
}
