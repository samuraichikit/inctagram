import { useEffect, useRef, useState } from 'react'

import { useDebounce } from '@/common/hooks/useDebounce'
import { useElementInView } from '@/common/hooks/useElementInView'
import { useGetUsersProfilesQuery } from '@/services/usersFollowingAndFollowersService'

import s from './userSearchItems.module.scss'

import { UserSearchItem } from '../userSearchItem/UserSearchItem'

type Props = {
  search: string
}

export const UserSearchItems = ({ search }: Props) => {
  const classNames = {
    usersProfilesContainer: s.usersProfilesContainer,
  }

  const [cursor, setCursor] = useState(0)

  const { isInView, targetRef } = useElementInView({ threshold: 0.5 })
  const prevInViewRef = useRef(false)
  const debouncedSearch = useDebounce(search)

  const { data } = useGetUsersProfilesQuery(
    { cursor, pageSize: 14, search: debouncedSearch },

    { skip: !debouncedSearch }
  )

  const usersProfiles = data?.items
  const nextCursor = data?.nextCursor
  const itemsToRender = debouncedSearch ? usersProfiles : []

  useEffect(() => {
    prevInViewRef.current = false
    setCursor(0)
  }, [debouncedSearch])

  useEffect(() => {
    const becameVisible = isInView && !prevInViewRef.current

    if (becameVisible && nextCursor) {
      setCursor(nextCursor)
    }
    prevInViewRef.current = isInView
  }, [isInView, nextCursor])

  return (
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
  )
}
