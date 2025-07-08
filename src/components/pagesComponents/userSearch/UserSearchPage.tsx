import { ChangeEvent, useState } from 'react'

import { useTranslation } from '@/common/hooks/useTranslation'
import { useGetUsersProfilesQuery } from '@/services/usersFollowingAndFollowers'
import { TextField, Typography } from '@samuraichikit/inc-ui-kit'

import s from './userSearch.module.scss'

import { UserSearchItem } from './userSearchItem'

export const UserSearchPage = () => {
  const classNames = {
    textField: s.textField,
    usersProfilesContainer: s.usersProfilesContainer,
  }
  const [search, setSearch] = useState('')
  const { t } = useTranslation()
  const { data } = useGetUsersProfilesQuery({ pageSize: 14, search }, { skip: !search })
  const usersProfiles = data?.items

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
      <div className={classNames.usersProfilesContainer}>
        {usersProfiles?.map(({ avatars, firstName, id, lastName, userName }) => (
          <UserSearchItem
            firsName={firstName}
            id={id}
            key={id}
            lastName={lastName}
            src={avatars[0]?.url}
            userName={userName}
          />
        ))}
      </div>
    </>
  )
}
