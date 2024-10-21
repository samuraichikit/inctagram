import { useTranslation } from '@/common/hooks/useTranslation'
import { LangSelect } from '@/components/langSelect/LangSelect'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import Link from 'next/link'

import s from './header.module.scss'

type Props = {
  isAuth: boolean
}

export const Header = ({ isAuth }: Props) => {
  const classNames = {
    buttonsContainer: s.buttonsContainer,
    container: s.container,
    header: s.header,
    navContainer: s.navContainer,
  }

  const { t } = useTranslation()

  return (
    <header className={classNames.header}>
      <div className={classNames.container}>
        <Typography variant={'large'}>Inctagram</Typography>
        <div className={classNames.navContainer}>
          <LangSelect />
          {!isAuth && (
            <div className={classNames.buttonsContainer}>
              <Button asChild variant={'text'}>
                <Link href={'auth/signIn'}>{t.header.signIn}</Link>
              </Button>
              <Button asChild>
                <Link href={'auth/signUp'}>{t.header.signUp}</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
