import { useCommonTablePagination } from '@/common/hooks/useCommonTablePagination'
import { useFollow } from '@/common/hooks/useFollow'
import { CommonTable } from '@/components/ui/commonTable'
import { Pagination } from '@/components/ui/pagination'
import { useGetFollowingQuery } from '@/services/admin/usersService.generated'
import { useRouter } from 'next/router'

export const Following = () => {
  const router = useRouter()
  const { query } = router
  const userId = Number(query.id)

  const { handleChangeCurrentPage, handlePageSizeChange, pageNumber, pageSize } =
    useCommonTablePagination({ defaultPageNumber: 1, defaultPageSize: 10 })

  const { data: followingData } = useGetFollowingQuery({
    variables: { pageNumber, pageSize, userId },
  })

  const following = followingData?.getFollowing.items ?? []
  const totalCount = followingData?.getFollowing.totalCount

  const { columns, itemsWithFullNames: followingWithFullNames } = useFollow({ items: following })

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
