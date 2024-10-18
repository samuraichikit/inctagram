import { LangSelect } from '@/components/langSelect/LangSelect'
import Link from 'next/link'

import { Button } from '../button'
import { Typography } from '../typography'

export const Header = () => {
  return (
    <header>
      <div>
        <Typography variant={'large'}>Inctagram</Typography>
        <LangSelect />
        <Button asChild variant={'text'}>
          <Link href={'auth/signIn'}>Log in</Link>
        </Button>
        <Button asChild>
          <Link href={'auth/signUp'}>Sign up</Link>
        </Button>
      </div>
    </header>
  )
}
