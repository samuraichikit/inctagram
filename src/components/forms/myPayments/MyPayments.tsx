import React from 'react'

import { useMyPayments } from '@/components/forms/myPayments/useMyPayments'
import { Pagination } from '@/components/ui/pagination'

import s from './MyPayments.module.scss'

import { SubscriptionHistory } from './subscriptionHistory'

export const MyPayments = () => {
  const {
    currentData,
    currentPage,
    formattedData,
    handlePageChange,
    handlePageSizeChange,
    isLoadingMyPayments,
    myPayments,
    pageSize,
    purchaseInfo,
  } = useMyPayments()

  if (isLoadingMyPayments || !myPayments) {
    return <div>Loading...</div>
  }

  const pagination = myPayments?.length > 5 && (
    <Pagination
      className={s.PaginationBlock}
      currentPage={currentPage}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
      pageSize={pageSize}
      totalCount={formattedData?.length}
    />
  )

  return (
    <div className={s.container}>
      <div className={s.blockPayments}>
        <div className={s.blockTitle}>
          {purchaseInfo.map(p => (
            <span className={s[p.className]} key={p.id}>
              {p.title}
            </span>
          ))}
        </div>
        {currentData.map((p, i) => (
          <SubscriptionHistory key={i} myPayment={p} />
        ))}
      </div>
      {pagination}
    </div>
  )
}
