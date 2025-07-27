import { TimeAgoDisplay } from '@samuraichikit/inc-ui-kit'
import { useRouter } from 'next/router'

import s from './publicationHeader.module.scss'

import { UserInfo } from '../../publicPage/publicPosts/userInfo'
import { PublicationDropdown } from './publicationDropdown'

type Props = {
  createAt: string
  src: string
  userName: string
}

export const PublicationHeader = ({ createAt, src, userName }: Props) => {
  const classNames = {
    circle: s.circle,
    container: s.container,
    timeAgo: s.timeAgo,
    userInfoContainer: s.userInfoContainer,
  }
  const { locale } = useRouter()
  const safeLocale = locale === 'ru' ? 'ru' : 'en'

  return (
    <div className={classNames.container}>
      <div className={classNames.userInfoContainer}>
        <UserInfo src={src} userName={userName} />
        <span className={classNames.circle} />
        <TimeAgoDisplay className={classNames.timeAgo} date={createAt} locale={safeLocale} />
      </div>
      <PublicationDropdown />
    </div>
  )
}
