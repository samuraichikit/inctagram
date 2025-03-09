import { useCommonTablePagination } from '@/common/hooks/useCommonTablePagination'
import { useFollow } from '@/common/hooks/useFollow'
import { CommonTableWithPaginationSkeleton } from '@/components/skeletons/commonTableWithPaginationSkeleton'
import { CommonTableWithPagination } from '@/components/ui/commonTableWithPagination'
import { useGetFollowersQuery } from '@/services/admin/usersService.generated'
import { useRouter } from 'next/router'

export const Followers = () => {
  const router = useRouter()
  const { query } = router
  const userId = Number(query.id)
  const { handleChangeCurrentPage, handlePageSizeChange, pageNumber, pageSize } =
    useCommonTablePagination({ defaultPageNumber: 1, defaultPageSize: 10 })

  const { data: followersData, loading } = useGetFollowersQuery({
    variables: { pageNumber, pageSize, userId },
  })

  const followers = followersData?.getFollowers.items ?? []
  const totalCount = followersData?.getFollowers.totalCount

  const {
    columns,
    itemsWithFullNames: followersWithFullNames,
    loadingGetFullName,
  } = useFollow({ items: followers })

  if (loading || loadingGetFullName) {
    return <CommonTableWithPaginationSkeleton count={11} height={42} />
  }

  return (
    <CommonTableWithPagination
      columns={columns}
      currentPage={pageNumber}
      onPageChange={handleChangeCurrentPage}
      onPageSizeChange={handlePageSizeChange}
      pageSize={pageSize}
      tableBodyData={followersWithFullNames}
      totalCount={totalCount}
    />
  )
}
