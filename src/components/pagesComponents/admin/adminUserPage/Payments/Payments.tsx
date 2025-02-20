import { Column, CommonTable } from '@/components/ui/commonTable'
import {
  GetPaymentsByUserQuery,
  useGetPaymentsByUserQuery,
} from '@/services/admin/paymentsService.generated'
import { useRouter } from 'next/router'

export const Payments = () => {
  const { query } = useRouter()
  const userId = Number(query.id)
  const columns: Column<GetPaymentsByUserQuery['getPaymentsByUser']['items'][number]>[] = [
    { accessor: 'dateOfPayment', sortable: true, title: 'Date of Payment' },
    { accessor: 'endDate', title: 'End date of subscription' },
    { accessor: 'price', title: 'Amount, $' },
    { accessor: 'type', title: 'Subscription Type' },
    { accessor: 'paymentType', sortable: true, title: 'Payment Type' },
  ]
  const { data } = useGetPaymentsByUserQuery({ variables: { userId } })

  const paymentsData = data?.getPaymentsByUser.items ?? []

  return <CommonTable columns={columns} tableBodyData={paymentsData} />
}
