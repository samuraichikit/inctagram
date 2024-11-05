import { GoogleIcon } from '@/assets/icons/GoogleIcon'
import { GOOGLE_URL } from '@/common/constants'

import { Button } from '../button'

export const GoogleAuthButton = () => {
  const googleAuthHandler = () => {
    window.location.assign(GOOGLE_URL)
  }

  return (
    <Button onClick={googleAuthHandler} variant={'icon'}>
      <GoogleIcon />
    </Button>
  )
}
