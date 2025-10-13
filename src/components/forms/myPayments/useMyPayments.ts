import { useState } from 'react'

import { useTranslation } from '@/common/hooks/useTranslation'
import { useGetMyPaymentsQuery } from '@/services/accountSubscriptions'

export const useMyPayments = () => {
  const { data: myPayments, isLoading: isLoadingMyPayments } = useGetMyPaymentsQuery()
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  const { t } = useTranslation()

  const formattedData = myPayments?.map(item => {
    return {
      ...item,
      dateOfPayment: formatDate(item.dateOfPayment),
      endDateOfSubscription: formatDate(item.endDateOfSubscription),
    }
  })

  const getPages = () => {
    if (formattedData) {
      const pages = []

      for (let i = 0; i < formattedData.length + 1; i += pageSize) {
        pages.push(formattedData.slice(i, i + pageSize))
      }

      return pages
    } else {
      return []
    }
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const handlePageSizeChange = (newSize: number) => {
    if (currentPage > 1) {
      setCurrentPage(1)
    }
    setPageSize(newSize)
  }

  const pages = getPages()
  const currentData = pages[currentPage - 1] || []

  const purchaseInfo = [
    { className: 'one', id: 1, title: t.myPayments.DateOfPayment },
    { className: 'two', id: 2, title: t.myPayments.EndDataOfSubscription },
    { className: 'three', id: 3, title: t.myPayments.Price },
    { className: 'fo', id: 4, title: t.myPayments.SubscriptionType },
    { className: 'five', id: 5, title: t.myPayments.PaymentType },
  ]

  return {
    currentData,
    currentPage,
    formattedData,
    handlePageChange,
    handlePageSizeChange,
    isLoadingMyPayments,
    myPayments,
    pageSize,
    purchaseInfo,
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return `${day}.${month}.${year}`
}
