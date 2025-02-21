import { useQueryParams } from '@/common/hooks/useQueryParams'
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
  const columns: Column<GetPaymentsByUserQuery['getPaymentsByUser']['items'][number]>[] = [
    { accessor: 'dateOfPayment', sortable: true, title: 'Date of Payment' },
    { accessor: 'endDate', title: 'End date of subscription' },
    { accessor: 'price', title: 'Amount, $' },
    { accessor: 'type', title: 'Subscription Type' },
    { accessor: 'paymentType', sortable: true, title: 'Payment Type' },
  ]
  const router = useRouter()
  const { query } = router
  const { searchParams, setQueryParams } = useQueryParams()
  const userId = Number(query.id)

  const currentPage = Number(searchParams?.get('currentPage') ?? 1)
  const pageSize = Number(searchParams?.get('pageSize') ?? 10)

  const { data } = useGetPaymentsByUserQuery({
    variables: { pageNumber: currentPage, pageSize, userId },
  })

  const paymentsData = data?.getPaymentsByUser.items ?? []
  const totalCount = data?.getPaymentsByUser.totalCount

  const handleChangeCurrentPage = (value: number) => {
    setQueryParams({ currentPage: String(value) })
  }

  const handlePageSizeChange = (pageSize: number) => {
    setQueryParams({ currentPage: '1', pageSize: String(pageSize) })
  }

  return (
    <>
      <CommonTable columns={columns} tableBodyData={paymentsData} />
      <Pagination
        className={classNames.pagination}
        currentPage={currentPage}
        onPageChange={handleChangeCurrentPage}
        onPageSizeChange={handlePageSizeChange}
        pageSize={pageSize}
        totalCount={totalCount}
      />
    </>
  )
}
