import { Typography } from '@/components/ui/typography'
import Image from 'next/image'

type Props = {
  src: string
  userName: string
}

export const UserInfo = ({ src, userName }: Props) => {
  return (
    <>
      <Image alt={'user avatar'} height={36} src={src} width={36} />
      <Typography variant={'h3'}>{userName}</Typography>
    </>
  )
}
