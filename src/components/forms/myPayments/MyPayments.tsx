import React, { useEffect, useState } from 'react'

import { useTranslation } from '@/common/hooks/useTranslation'
import { MobileMyPayments } from '@/components/forms/myPayments/mobileMyPayments/MobileMyPayments'
import { Pagination } from '@/components/ui/pagination'
import { useGetMyPaymentsQuery } from '@/services/accountSubscriptions/accountSubsService'

import s from './MyPayments.module.scss'

export const getServerSideProps = () => {
  const windowInnerWidth = window.innerWidth

  return {
    props: {
      windowInnerWidth,
    },
  }
}

type PropsType = {
  windowInnerWidth: number
}

export const MyPayments = ({ windowInnerWidth }: PropsType) => {
  const { data, isLoading } = useGetMyPaymentsQuery()
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  const { t } = useTranslation()

  const [init, setInit] = useState(false)
  const [width, setWidth] = useState(windowInnerWidth)
  const breakpoint = 1177

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleWindowResize = () => setWidth(window.innerWidth)

      setInit(true)
      window.addEventListener('resize', handleWindowResize)

      return () => window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!data) {
    return <></>
  }

  const formattedData = data?.map(item => {
    return {
      ...item,
      dateOfPayment: formatDate(item.dateOfPayment),
      endDateOfSubscription: formatDate(item.endDateOfSubscription),
    }
  })

  // Функция для разбиения данных на страницы
  const getPages = () => {
    const pages = []

    for (let i = 0; i < formattedData.length + 1; i += pageSize) {
      pages.push(formattedData.slice(i, i + pageSize))
    }

    return pages
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

  return (
    <>
      {!init ? (
        <div>Loading...</div>
      ) : (
        <div className={s.container}>
          {width < breakpoint ? (
            <MobileMyPayments currentData={currentData} t={t} />
          ) : (
            <div className={s.blockPayments}>
              <div className={s.blockTitle}>
                <span className={s.one}>{t.myPayments.DateOfPayment}</span>
                <span className={s.two}>{t.myPayments.EndDataOfSubscription}</span>
                <span className={s.three}>{t.myPayments.Price}</span>
                <span className={s.fo}>{t.myPayments.SubscriptionType}</span>
                <span className={s.five}>{t.myPayments.PaymentType}</span>
              </div>
              {currentData.map((p, i) => (
                <div className={s.blockInfoPrice} key={i}>
                  <span>{p.dateOfPayment}</span>
                  <span>{p.endDateOfSubscription}</span>
                  <span className={s.Price}>
                    <span>${p.price}</span>
                  </span>
                  <span className={s.SubsType}>{p.subscriptionType}</span>
                  <span className={s.PaymentType}>{p.paymentType}</span>
                </div>
              ))}
            </div>
          )}
          <Pagination
            className={s.PaginationBlock}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            pageSize={pageSize}
            totalCount={formattedData.length}
          />
        </div>
      )}
    </>
  )
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return `${day}.${month}.${year}`
}
