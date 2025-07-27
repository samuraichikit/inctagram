import { HeartIcon } from '@/assets/icons/HeartIcon'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import { BookmarkOutlineIcon, Button, MessengerIcon } from '@samuraichikit/inc-ui-kit'

import s from './actionBar.module.scss'

export const ActionBar = () => {
  const classNames = {
    container: s.container,
    iconsWrapper: s.iconsWrapper,
  }

  return (
    <div className={classNames.container}>
      <div className={classNames.iconsWrapper}>
        <Button variant={'icon'}>
          <HeartIcon />
        </Button>
        <Button variant={'icon'}>
          <MessengerIcon />
        </Button>
        <Button variant={'icon'}>
          <PaperPlaneIcon />
        </Button>
      </div>
      <Button variant={'icon'}>
        <BookmarkOutlineIcon />
      </Button>
    </div>
  )
}
