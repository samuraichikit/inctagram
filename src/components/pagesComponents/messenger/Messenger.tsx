import { useAppSelector } from '@/app/store'
import { Avatar } from '@/components/ui/avatar'
import { useMeQuery } from '@/services/auth'
import { messengerService } from '@/services/messenger'
import { Typography } from '@samuraichikit/inc-ui-kit'
import { useRouter } from 'next/router'

import s from './Messenger.module.scss'

import { OpenChat } from './chat'

const Messenger = () => {
  const { data: meData } = useMeQuery()
  const myId = meData?.userId
  const { query } = useRouter()
  const { id } = query
  const dialoguesData = useAppSelector(
    state => messengerService.endpoints.getMessages.select({})(state)?.data
  )
  const dialoguePartnerId = Number(id)
  const partner = dialoguesData?.items.find(latestMessageData => {
    const isOwner = latestMessageData.ownerId === myId
    const partnerId = isOwner ? latestMessageData.receiverId : latestMessageData.ownerId

    return partnerId === dialoguePartnerId
  })

  return (
    <div className={s.messengerContent}>
      <div className={s.headerWrapper}>
        {id && (
          <div className={s.userInfo}>
            <Avatar height={48} src={partner?.avatars[0].url} width={48} />
            <Typography variant={'regular_text_16'}>{partner?.userName}</Typography>
          </div>
        )}
      </div>
      <OpenChat dialoguePartnerId={dialoguePartnerId} partnerAvatar={partner?.avatars[0].url} />
    </div>
  )
}

export default Messenger
