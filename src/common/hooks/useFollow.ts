import { useEffect, useState } from 'react'

import { Column } from '@/components/ui/commonTable'
import { Follow } from '@/services/admin/types'
import { useGetUserLazyQuery } from '@/services/admin/usersService.generated'

type Props = {
  items: Follow[]
}
type FollowWithFullNames = ({ fullName: string } & Follow)[]

export const useFollow = ({ items }: Props) => {
  const columns: Column<FollowWithFullNames[number]>[] = [
    { accessor: 'userId', title: 'User ID' },
    { accessor: 'fullName', title: 'Username' },
    {
      accessor: 'userName',
      href: row => `/profile/${row.userId}`,
      isLink: true,
      sortable: true,
      title: 'Profile link',
    },
    { accessor: 'createdAt', sortable: true, title: 'Subscription Date' },
  ]

  const [getFullName] = useGetUserLazyQuery()
  const [itemsWithFullNames, setItemsWithFullNames] = useState<FollowWithFullNames>([])

  useEffect(() => {
    const fetchFollowersFullNames = async () => {
      if (!items || items.length === 0) {
        return
      }

      const followersWithFullNames = await Promise.all(
        items.map(async item => {
          const { data } = await getFullName({ variables: { userId: item.id } })
          const firstName = data?.getUser.profile.firstName ?? ''
          const lastName = data?.getUser.profile.lastName ?? ''
          const fullName = `${firstName} ${lastName}`

          return { ...item, fullName }
        })
      )

      setItemsWithFullNames(followersWithFullNames)
    }

    fetchFollowersFullNames()
  }, [items, getFullName])

  return { columns, itemsWithFullNames }
}
