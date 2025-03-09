import { useCommonTablePagination } from '@/common/hooks/useCommonTablePagination'
import { useFollow } from '@/common/hooks/useFollow'
import { CommonTableWithPaginationSkeleton } from '@/components/skeletons/commonTableWithPaginationSkeleton'
import { CommonTable } from '@/components/ui/commonTableWithPagination'
import { Pagination } from '@/components/ui/pagination'
import { useGetFollowersQuery } from '@/services/admin/usersService.generated'
import { useRouter } from 'next/router'

import s from './followers.module.scss'

export const Followers = () => {
  const classNames = {
    pagination: s.pagination,
  }
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
    <>
      <CommonTable columns={columns} tableBodyData={followersWithFullNames} />
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
