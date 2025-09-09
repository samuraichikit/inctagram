import React from 'react'

import { MicrophoneIcon } from '@/assets/icons/MicrophoneIcon'
import { PictureIcon } from '@/assets/icons/PictureIcon'
import { useTranslation } from '@/common/hooks/useTranslation'
import { TextField } from '@samuraichikit/inc-ui-kit'

import s from './OpenChat.module.scss'

const OpenChat = () => {
  const { t } = useTranslation()

  return (
    <div className={s.chatWrapper}>
      <div className={s.chat}>
        <div className={s.emptyChat}>{t.messenger.openChat}</div>
      </div>
      <div className={s.inputWrapper}>
        <TextField placeholder={t.messenger.placeholder} />
        <div className={s.inputActions}>
          <div className={s.inputIcons}>
            <MicrophoneIcon />
            <PictureIcon />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OpenChat
