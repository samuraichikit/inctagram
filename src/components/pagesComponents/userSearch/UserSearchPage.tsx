import { ChangeEvent, useEffect, useRef, useState } from 'react'

import { useElementInView } from '@/common/hooks/useElementInView'
import { useTranslation } from '@/common/hooks/useTranslation'
import { useGetUsersProfilesQuery } from '@/services/usersService'
import { TextField, Typography } from '@samuraichikit/inc-ui-kit'

import s from './userSearchPage.module.scss'

import { UserSearchItem } from './userSearchItem'

export const UserSearchPage = () => {
  const classNames = {
    textField: s.textField,
    usersProfilesContainer: s.usersProfilesContainer,
  }
  const [search, setSearch] = useState('')
  const [cursor, setCursor] = useState(0)
  const { t } = useTranslation()
  const { isInView, targetRef } = useElementInView({ threshold: 0.5 })
  const prevInViewRef = useRef(false)

  const { data } = useGetUsersProfilesQuery(
    { cursor, pageSize: 14, search },

    { skip: !search }
  )
  const usersProfiles = data?.items
  const nextCursor = data?.nextCursor
  const itemsToRender = search ? usersProfiles : []

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value)
  }

  useEffect(() => {
    prevInViewRef.current = false
    setCursor(0)
  }, [search])

  useEffect(() => {
    const becameVisible = isInView && !prevInViewRef.current

    if (becameVisible && nextCursor) {
      setCursor(nextCursor)
    }
    prevInViewRef.current = isInView
  }, [isInView, nextCursor])

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
        {itemsToRender?.map(({ avatars, firstName, id, lastName, userName }, index) => (
          <UserSearchItem
            firsName={firstName}
            id={id}
            key={id}
            lastName={lastName}
            ref={index === itemsToRender.length - 1 ? targetRef : null}
            src={avatars[0]?.url}
            userName={userName}
          />
        ))}
      </div>
    </>
  )
}
