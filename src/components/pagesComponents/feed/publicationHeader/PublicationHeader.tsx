import { Button, TimeAgoDisplay } from '@samuraichikit/inc-ui-kit'
import { useRouter } from 'next/router'

import { UserInfo } from '../../publicPage/publicPosts/userInfo'

type Props = {
  createAt: string
  src: string
  userName: string
}

export const PublicationHeader = ({ createAt, src, userName }: Props) => {
  const { locale } = useRouter()
  const safeLocale = locale === 'ru' ? 'ru' : 'en'

  return (
    <>
      <UserInfo src={src} userName={userName} />
      <span />
      <TimeAgoDisplay date={createAt} locale={safeLocale} />
      <Button>...</Button>
    </>
  )
}
