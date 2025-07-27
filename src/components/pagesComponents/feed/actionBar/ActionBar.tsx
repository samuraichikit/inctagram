import { HeartIcon } from '@/assets/icons/HeartIcon'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import { BookmarkOutlineIcon, Button, MessengerIcon } from '@samuraichikit/inc-ui-kit'

export const ActionBar = () => {
  return (
    <>
      <Button variant={'icon'}>
        <HeartIcon />
      </Button>
      <Button variant={'icon'}>
        <MessengerIcon />
      </Button>
      <Button variant={'icon'}>
        <PaperPlaneIcon />
      </Button>
      <Button variant={'icon'}>
        <BookmarkOutlineIcon />
      </Button>
    </>
  )
}
