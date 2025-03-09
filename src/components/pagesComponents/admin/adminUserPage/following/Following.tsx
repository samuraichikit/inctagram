import { useCommonTablePagination } from '@/common/hooks/useCommonTablePagination'
import { useFollow } from '@/common/hooks/useFollow'
import { CommonTableWithPaginationSkeleton } from '@/components/skeletons/commonTableWithPaginationSkeleton'
import { CommonTable } from '@/components/ui/commonTableWithPagination'
import { Pagination } from '@/components/ui/pagination'
import { useGetFollowingQuery } from '@/services/admin/usersService.generated'
import { useRouter } from 'next/router'

import s from './following.module.scss'

export const Following = () => {
  const classNames = {
    pagination: s.pagination,
  }
  const router = useRouter()
  const { query } = router
  const userId = Number(query.id)

  const { handleChangeCurrentPage, handlePageSizeChange, pageNumber, pageSize } =
    useCommonTablePagination({ defaultPageNumber: 1, defaultPageSize: 10 })

  const { data: followingData, loading } = useGetFollowingQuery({
    variables: { pageNumber, pageSize, userId },
  })

  const following = followingData?.getFollowing.items ?? []
  const totalCount = followingData?.getFollowing.totalCount

  const {
    columns,
    itemsWithFullNames: followingWithFullNames,
    loadingGetFullName,
  } = useFollow({ items: following })

  if (loading || loadingGetFullName) {
    return <CommonTableWithPaginationSkeleton count={11} height={42} />
  }

  return (
    <>
      <CommonTable columns={columns} tableBodyData={followingWithFullNames} />
      <Pagination
        className={classNames.pagination}
        currentPage={pageNumber}
        onPageChange={handleChangeCurrentPage}
        onPageSizeChange={handlePageSizeChange}
        pageSize={pageSize}
        totalCount={totalCount}
      />
    </>
  )
}
