import { Avatar } from '@/components/ui/avatar'
import { Typography } from '@samuraichikit/inc-ui-kit'

import s from './Messenger.module.scss'

import { OpenChat } from './chat'

const Messenger = () => {
  return (
    <div className={s.messengerContent}>
      <div className={s.headerWrapper}>
        <div className={s.userInfo}>
          <Avatar height={48} width={48} />
          <Typography>userName</Typography>
        </div>
      </div>
      <OpenChat />
    </div>
  )
}

export default Messenger
