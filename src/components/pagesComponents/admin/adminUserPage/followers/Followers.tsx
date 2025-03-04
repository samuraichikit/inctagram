import { useEffect, useState } from 'react'

import { useQueryParams } from '@/common/hooks/useQueryParams'
import { Column, CommonTable } from '@/components/ui/commonTable'
import { Pagination } from '@/components/ui/pagination'
import { Follow } from '@/services/admin/types'
import { useGetFollowersQuery, useGetUserLazyQuery } from '@/services/admin/usersService.generated'
import { useRouter } from 'next/router'

type FollowersWithFullNames = ({ fullName: string } & Follow)[]

export const Followers = () => {
  const columns: Column<FollowersWithFullNames[number]>[] = [
    { accessor: 'userId', title: 'User ID' },
    { accessor: 'fullName', title: 'Username' },
    { accessor: 'userName', sortable: true, title: 'Profile link' },
    { accessor: 'createdAt', sortable: true, title: 'Subscription Date' },
  ]
  const router = useRouter()
  const { query } = router
  const userId = Number(query.id)
  const { searchParams, setQueryParams } = useQueryParams()
  const pageNumber = Number(searchParams?.get('pageNumber') ?? 1)
  const pageSize = Number(searchParams?.get('pageSize') ?? 10)
  const { data: followersData } = useGetFollowersQuery({
    variables: { pageNumber, pageSize, userId: 1 },
  })

  const [getFollowerFullName] = useGetUserLazyQuery()
  const [followersWithFullNames, setFollowersWithFullNames] = useState<FollowersWithFullNames>([])
  const followers = followersData?.getFollowers.items
  const totalCount = followersData?.getFollowers.totalCount

  const handleChangeCurrentPage = (value: number) => {
    setQueryParams({ pageNumber: String(value) })
  }

  const handlePageSizeChange = (pageSize: number) => {
    setQueryParams({ pageNumber: '1', pageSize: String(pageSize) })
  }

  useEffect(() => {
    const fetchFollowersFullNames = async () => {
      if (!followers) {
        return
      }
      const followersWithFullNames = await Promise.all(
        followers.map(async follower => {
          const { data } = await getFollowerFullName({ variables: { userId: follower.id } })
          const firstName = data?.getUser.profile.firstName ?? ''
          const lastName = data?.getUser.profile.lastName ?? ''
          const fullName = `${firstName} ${lastName}`

          return { ...follower, fullName }
        })
      )

      setFollowersWithFullNames(followersWithFullNames)
    }

    fetchFollowersFullNames()
  }, [followers, getFollowerFullName])

  return (
    <>
      <CommonTable columns={columns} tableBodyData={followersWithFullNames} />
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
