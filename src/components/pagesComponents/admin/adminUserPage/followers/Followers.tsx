import { useCommonTablePagination } from '@/common/hooks/useCommonTablePagination'
import { useFollow } from '@/common/hooks/useFollow'
import { CommonTable } from '@/components/ui/commonTable'
import { Pagination } from '@/components/ui/pagination'
import { useGetFollowersQuery } from '@/services/admin/usersService.generated'
import { useRouter } from 'next/router'

export const Followers = () => {
  const router = useRouter()
  const { query } = router
  const userId = Number(query.id)
  const { handleChangeCurrentPage, handlePageSizeChange, pageNumber, pageSize } =
    useCommonTablePagination({ defaultPageNumber: 1, defaultPageSize: 10 })

  const { data: followersData } = useGetFollowersQuery({
    variables: { pageNumber, pageSize, userId: 1 },
  })

  const followers = followersData?.getFollowers.items ?? []
  const totalCount = followersData?.getFollowers.totalCount

  const { columns, itemsWithFullNames: followersWithFullNames } = useFollow({ items: followers })

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
