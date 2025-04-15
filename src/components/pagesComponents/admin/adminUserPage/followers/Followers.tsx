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
import { useGetFollowersQuery } from '@/services/admin/usersService.generated'
import { useRouter } from 'next/router'

export const Followers = () => {
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

  const { data: followersData, loading } = useGetFollowersQuery({
    variables: { pageNumber, pageSize, sortBy, sortDirection, userId },
  })

  const followers = followersData?.getFollowers.items ?? []
  const totalCount = followersData?.getFollowers.totalCount ?? 0

  const {
    columns,
    itemsWithFullNames: followersWithFullNames,
    loadingGetFullName,
  } = useFollow({ items: followers })

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
      tableBodyData={followersWithFullNames}
      totalCount={totalCount}
    />
  )
}
