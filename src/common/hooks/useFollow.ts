import { useEffect, useState } from 'react'

import { Column } from '@/components/ui/commonTable'
import { Follow } from '@/services/admin/types'
import { useGetUserLazyQuery } from '@/services/admin/usersService.generated'

import { useTranslation } from './useTranslation'

type Props = {
  items: Follow[]
}
type FollowWithFullNames = ({ fullName: string } & Follow)[]

export const useFollow = ({ items }: Props) => {
  const { t } = useTranslation()
  const columns: Column<FollowWithFullNames[number]>[] = [
    { accessor: 'userId', title: t.adminUserPage.userId },
    { accessor: 'fullName', title: t.adminUserPage.userName },
    {
      accessor: 'userName',
      href: row => `/profile/${row.userId}`,
      isLink: true,
      sortable: true,
      title: t.adminUserPage.profileLink,
    },
    { accessor: 'createdAt', sortable: true, title: t.adminUserPage.subscriptionDate },
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
