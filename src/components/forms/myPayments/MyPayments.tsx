import React from 'react'

import { useTranslation } from '@/common/hooks/useTranslation'
import { useMyPayments } from '@/components/forms/myPayments/useMyPayments'
import { Pagination } from '@samuraichikit/inc-ui-kit'

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

  const { t } = useTranslation()

  if (isLoadingMyPayments || !myPayments) {
    return <div>Loading...</div>
  }

  const pagination = myPayments?.length > 5 && (
    <Pagination
      afterSelectContent={t.pagination.onPage}
      beforeSelectContent={t.pagination.show}
      className={s.PaginationBlock}
      currentPage={currentPage}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
      pageSize={pageSize}
      totalCount={formattedData?.length ?? 0}
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
