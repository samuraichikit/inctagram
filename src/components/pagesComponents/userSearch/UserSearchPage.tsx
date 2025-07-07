import { ChangeEvent, useState } from 'react'

import { useTranslation } from '@/common/hooks/useTranslation'
import { TextField, Typography } from '@samuraichikit/inc-ui-kit'

import s from './userSearchPage.module.scss'

import { UserSearchItems } from './userSearchItems'

export const UserSearchPage = () => {
  const classNames = {
    textField: s.textField,
  }

  const [search, setSearch] = useState('')
  const { t } = useTranslation()

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value)
  }

  return (
    <>
      <Typography asChild variant={'h1'}>
        <h1>{t.searchPage.search}</h1>
      </Typography>
      <TextField
        className={classNames.textField}
        onChange={searchHandler}
        placeholder={t.searchPage.search}
        type={'search'}
        value={search}
      />
      <UserSearchItems search={search} />
    </>
  )
}
