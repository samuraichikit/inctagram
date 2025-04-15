import { GOOGLE_URL } from '@/common/constants'
import { Button, GoogleIcon } from '@samuraichikit/inc-ui-kit'

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
