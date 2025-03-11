import {
  DEFAULT_HEIGHT_COMMON_TABLE_ROW,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
} from '@/common/constants'
import { useCommonTablePagination } from '@/common/hooks/useCommonTablePagination'
import { FollowAccessors, useFollow } from '@/common/hooks/useFollow'
import { useSort } from '@/common/hooks/useSort'
import { CommonTableWithPaginationSkeleton } from '@/components/skeletons/commonTableWithPaginationSkeleton'
import { CommonTableWithPagination } from '@/components/ui/commonTableWithPagination'
import { SortDirection } from '@/services/admin/types'
import { useGetFollowingQuery } from '@/services/admin/usersService.generated'
import { useRouter } from 'next/router'

export const Following = () => {
  const router = useRouter()
  const { query } = router
  const userId = Number(query.id)

  const { handleChangeCurrentPage, handlePageSizeChange, pageNumber, pageSize } =
    useCommonTablePagination({
      defaultPageNumber: DEFAULT_PAGE_NUMBER,
      defaultPageSize: DEFAULT_PAGE_SIZE,
    })
  const { handleChangeSort, sortBy, sortDirection } = useSort<FollowAccessors>({
    defaultSortBy: 'createdAt',
    defaultSortDirection: SortDirection.Desc,
  })

  const { data: followingData, loading } = useGetFollowingQuery({
    variables: { pageNumber, pageSize, sortBy, sortDirection, userId },
  })

  const following = followingData?.getFollowing.items ?? []
  const totalCount = followingData?.getFollowing.totalCount

  const {
    columns,
    itemsWithFullNames: followingWithFullNames,
    loadingGetFullName,
  } = useFollow({ items: following })

  if (loading || loadingGetFullName) {
    return (
      <CommonTableWithPaginationSkeleton
        count={DEFAULT_PAGE_SIZE + 1}
        height={DEFAULT_HEIGHT_COMMON_TABLE_ROW}
      />
    )
  }

  return (
    <CommonTableWithPagination
      columns={columns}
      currentPage={pageNumber}
      onChangeSort={handleChangeSort}
      onPageChange={handleChangeCurrentPage}
      onPageSizeChange={handlePageSizeChange}
      pageSize={pageSize}
      sortColumn={sortBy}
      sortDirection={sortDirection}
      tableBodyData={followingWithFullNames}
      totalCount={totalCount}
    />
  )
}
