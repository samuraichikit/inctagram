import { ChangeEvent, useEffect, useRef, useState } from 'react'

import { useDebounce } from '@/common/hooks/useDebounce'
import { useElementInView } from '@/common/hooks/useElementInView'
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
  const [cursor, setCursor] = useState(0)
  const prevInViewRef = useRef(false)
  const { t } = useTranslation()
  const debouncedSearch = useDebounce(search)
  const { data } = useGetUsersProfilesQuery(
    { cursor, pageSize: 14, search: debouncedSearch },
    { skip: !debouncedSearch }
  )
  const { isInView, targetRef } = useElementInView({ threshold: 0.5 })

  const usersProfiles = data?.items
  const nextCursor = data?.nextCursor ?? 0
  const itemsToRender = debouncedSearch ? usersProfiles : []
  const isDisplayDivWithRef = itemsToRender && itemsToRender?.length > 0

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value)
  }

  useEffect(() => {
    setCursor(0)
    prevInViewRef.current = false
  }, [debouncedSearch])

  useEffect(() => {
    if (isInView && nextCursor && !prevInViewRef.current) {
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
            src={avatars[0]?.url}
            userName={userName}
          />
        ))}
      </div>
      {isDisplayDivWithRef && <div ref={targetRef} />}
    </>
  )
}
