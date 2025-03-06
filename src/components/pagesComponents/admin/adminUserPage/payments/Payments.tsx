import { useCommonTablePagination } from '@/common/hooks/useCommonTablePagination'
import { useTranslation } from '@/common/hooks/useTranslation'
import { Column, CommonTable } from '@/components/ui/commonTable'
import { Pagination } from '@/components/ui/pagination'
import {
  GetPaymentsByUserQuery,
  useGetPaymentsByUserQuery,
} from '@/services/admin/paymentsService.generated'
import { useRouter } from 'next/router'

import s from './payments.module.scss'

export const Payments = () => {
  const classNames = {
    pagination: s.pagination,
  }
  const { t } = useTranslation()
  const columns: Column<GetPaymentsByUserQuery['getPaymentsByUser']['items'][number]>[] = [
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
    useCommonTablePagination({ defaultPageNumber: 1, defaultPageSize: 10 })

  const { data } = useGetPaymentsByUserQuery({
    variables: { pageNumber, pageSize, userId },
  })

  const paymentsData = data?.getPaymentsByUser.items ?? []
  const totalCount = data?.getPaymentsByUser.totalCount

  return (
    <>
      <CommonTable columns={columns} tableBodyData={paymentsData} />
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
