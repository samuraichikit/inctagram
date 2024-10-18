import { LangSelect } from '@/components/langSelect/LangSelect'
import Link from 'next/link'

import s from './header.module.scss'

import { Button } from '../button'
import { Typography } from '../typography'

export const Header = () => {
  const classNames = {
    buttonsContainer: s.buttonsContainer,
    container: s.container,
    header: s.header,
    navContainer: s.navContainer,
  }

  return (
    <header className={classNames.header}>
      <div className={classNames.container}>
        <Typography variant={'large'}>Inctagram</Typography>
        <div className={classNames.navContainer}>
          <LangSelect />
          <div className={classNames.buttonsContainer}>
            <Button asChild variant={'text'}>
              <Link href={'auth/signIn'}>Log in</Link>
            </Button>
            <Button asChild>
              <Link href={'auth/signUp'}>Sign up</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
