import { useEffect, useState } from 'react'

import { useCommonTablePagination } from '@/common/hooks/useCommonTablePagination'
import { Column, CommonTable } from '@/components/ui/commonTable'
import { Pagination } from '@/components/ui/pagination'
import { Follow } from '@/services/admin/types'
import { useGetFollowingQuery, useGetUserLazyQuery } from '@/services/admin/usersService.generated'
import { useRouter } from 'next/router'

type FollowingWithFullNames = ({ fullName: string } & Follow)[]

export const Following = () => {
  const columns: Column<FollowingWithFullNames[number]>[] = [
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
  const router = useRouter()
  const { query } = router
  const userId = Number(query.id)

  const { handleChangeCurrentPage, handlePageSizeChange, pageNumber, pageSize } =
    useCommonTablePagination({ defaultPageNumber: 1, defaultPageSize: 10 })

  const { data: followingData } = useGetFollowingQuery({
    variables: { pageNumber, pageSize, userId: 7 },
  })

  const [getFollowingFullName] = useGetUserLazyQuery()
  const [followingWithFullNames, setFollowingWithFullNames] = useState<FollowingWithFullNames>([])
  const following = followingData?.getFollowing.items
  const totalCount = followingData?.getFollowing.totalCount

  useEffect(() => {
    const fetchFollowingsFullNames = async () => {
      if (!following) {
        return
      }
      const followingWithFullNames = await Promise.all(
        following.map(async followingItem => {
          const { data } = await getFollowingFullName({ variables: { userId: followingItem.id } })
          const firstName = data?.getUser.profile.firstName ?? ''
          const lastName = data?.getUser.profile.lastName ?? ''
          const fullName = `${firstName} ${lastName}`

          return { ...followingItem, fullName }
        })
      )

      setFollowingWithFullNames(followingWithFullNames)
    }

    fetchFollowingsFullNames()
  }, [following, getFollowingFullName])

  return (
    <>
      <CommonTable columns={columns} tableBodyData={followingWithFullNames} />
      <Pagination
        currentPage={pageNumber}
        onPageChange={handleChangeCurrentPage}
        onPageSizeChange={handlePageSizeChange}
        pageSize={pageSize}
        totalCount={totalCount}
      />
    </>
  )
}
