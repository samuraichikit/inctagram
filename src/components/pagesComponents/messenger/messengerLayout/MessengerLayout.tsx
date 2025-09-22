import { PropsWithChildren, ReactNode } from 'react'

import { useTranslation } from '@/common/hooks/useTranslation'
import { Typography } from '@samuraichikit/inc-ui-kit'
import { NextPage } from 'next'

import s from './messengerLayout.module.scss'

import { Chats } from '../chats'

export const MessengerLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation()

  return (
    <div className={s.messengerWrapper}>
      <Typography className={s.messengerTitle} variant={'h1'}>
        {t.messenger.title}
      </Typography>
      <div className={s.messenger}>
        <Chats />
        {children}
      </div>
    </div>
  )
}
