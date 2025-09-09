import React from 'react'

import { useTranslation } from '@/common/hooks/useTranslation'
import LatestChat from '@/components/pagesComponents/messenger/chats/latestChat/LatestChat'
import { TextField } from '@samuraichikit/inc-ui-kit'

import s from './Chats.module.scss'

const Chats = () => {
  const { t } = useTranslation()

  return (
    <div className={s.latestChatsWrapper}>
      <div className={s.searchInput}>
        <TextField placeholder={t.messenger.inputSearch} />
      </div>
      <div className={s.latestChats}>
        <LatestChat />
      </div>
    </div>
  )
}

export default Chats
