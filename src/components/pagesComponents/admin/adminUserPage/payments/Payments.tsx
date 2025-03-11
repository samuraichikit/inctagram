import {
  DEFAULT_HEIGHT_COMMON_TABLE_ROW,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
} from '@/common/constants'
import { useCommonTablePagination } from '@/common/hooks/useCommonTablePagination'
import { useSort } from '@/common/hooks/useSort'
import { useTranslation } from '@/common/hooks/useTranslation'
import { CommonTableWithPaginationSkeleton } from '@/components/skeletons/commonTableWithPaginationSkeleton'
import { Column, CommonTableWithPagination } from '@/components/ui/commonTableWithPagination'
import {
  GetPaymentsByUserQuery,
  useGetPaymentsByUserQuery,
} from '@/services/admin/paymentsService.generated'
import { SortDirection } from '@/services/admin/types'
import { useRouter } from 'next/router'

type PaymentColumn = Column<GetPaymentsByUserQuery['getPaymentsByUser']['items'][number]>
type PaymentColumnAccessors = PaymentColumn['accessor']

export const Payments = () => {
  const { t } = useTranslation()
  const columns: PaymentColumn[] = [
    { accessor: 'dateOfPayment', sortable: true, title: t.adminUserPage.dateOfPayment },
    { accessor: 'endDate', title: t.adminUserPage.endDateOfSubscription },
    { accessor: 'price', title: `${t.adminUserPage.amount}, $` },
    { accessor: 'type', title: t.adminUserPage.subscriptionType },
    { accessor: 'paymentType', sortable: true, title: t.adminUserPage.paymentType },
  ]
  const router = useRouter()
  const { query } = router
  const userId = Number(query.id)

  const { handleChangeCurrentPage, handlePageSizeChange, pageNumber, pageSize } =
    useCommonTablePagination({
      defaultPageNumber: DEFAULT_PAGE_NUMBER,
      defaultPageSize: DEFAULT_PAGE_SIZE,
    })
  const { handleChangeSort, sortBy, sortDirection } = useSort<PaymentColumnAccessors>({
    defaultSortBy: 'dateOfPayment',
    defaultSortDirection: SortDirection.Desc,
  })

  const { data, loading } = useGetPaymentsByUserQuery({
    variables: { pageNumber, pageSize, sortBy, sortDirection, userId },
  })

  const paymentsData = data?.getPaymentsByUser.items ?? []
  const totalCount = data?.getPaymentsByUser.totalCount

  if (loading) {
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
      tableBodyData={paymentsData}
      totalCount={totalCount}
    />
  )
}
