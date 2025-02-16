import { useState } from 'react'

import { BanIcon } from '@/assets/icons/BanIcon'
import { MoreIcon } from '@/assets/icons/MoreIcon'
import { PersonRemoveIcon } from '@/assets/icons/PersonRemoveIcon'
import { useTranslation } from '@/common/hooks/useTranslation'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

import s from './actionMenu.module.scss'

type Props = {}

export const ActionsMenu = ({}: Props) => {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false)
  const { t } = useTranslation()

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen)
  }

  return (
    <div>
      <Button className={s.toggle} onClick={toggleEditModal} variant={'icon'}>
        {'...'}
      </Button>
      {editModalOpen && (
        <div className={s.adminModal}>
          <Button className={s.btn} variant={'icon'}>
            <PersonRemoveIcon /> <Typography variant={'regular_text_14'}>Delete User</Typography>
          </Button>
          <Button className={s.btn} variant={'icon'}>
            <BanIcon /> <Typography variant={'regular_text_14'}>Ban in the system</Typography>
          </Button>
          <Button className={s.btn} variant={'icon'}>
            <MoreIcon /> <Typography variant={'regular_text_14'}>More Information</Typography>
          </Button>
        </div>
      )}
    </div>
  )
}
