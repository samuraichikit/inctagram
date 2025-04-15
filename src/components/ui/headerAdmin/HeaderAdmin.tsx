import { LangSelect } from '@/components/langSelect/LangSelect'
import { Typography } from '@samuraichikit/inc-ui-kit'

import s from './headerAdmin.module.scss'

export const HeaderAdmin = () => {
  const classNames = {
    container: s.container,
    header: s.header,
    title: s.title,
  }

  return (
    <header className={classNames.header}>
      <div className={classNames.container}>
        <div className={classNames.title}>
          <Typography variant={'large'}>Inctagram</Typography>
          <Typography variant={'small_text'}>Super</Typography>
          <Typography variant={'semi-bold_small_text'}>Admin</Typography>
        </div>
        <LangSelect />
      </div>
    </header>
  )
}
