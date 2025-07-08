import s from './userSearchPage.module.scss'

import { UserSearchItemSkeleton } from './userSearchItem/UserSearchItemSkeleton'

type Props = {
  itemsCount: number
}

export const UserSearchItemsSkeleton = ({ itemsCount }: Props) => {
  const classNames = {
    usersProfilesContainer: s.usersProfilesContainer,
  }

  return (
    <div className={classNames.usersProfilesContainer}>
      {Array.from({ length: itemsCount ?? 1 }).map((_, index) => (
        <UserSearchItemSkeleton key={index} />
      ))}
    </div>
  )
}
