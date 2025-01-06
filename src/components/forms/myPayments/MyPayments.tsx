import React, { useEffect, useState } from 'react'

import { Pagination } from '@/components/ui/pagination'
import { useGetMyPaymentsQuery } from '@/services/accountSubscriptions/accountSubsService'

import s from './MyPayments.module.scss'

export const MyPayments = () => {
  const { data, isLoading } = useGetMyPaymentsQuery()
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  const [width, setWidth] = useState(window.innerWidth)
  const breakpoint = 1177

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)

    window.addEventListener('resize', handleWindowResize)

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener('resize', handleWindowResize)
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
    setPageSize(newSize)
    setCurrentPage(1) // Сброс на первую страницу при изменении размера
  }

  const pages = getPages()
  const currentData = pages[currentPage - 1] || []

  const getPageSizeHandler = (value: number) => {
    if (currentPage > 1) {
      setCurrentPage(1)
    }
    setPageSize(value)
  }

  return (
    <div className={s.container}>
      {width < breakpoint ? (
        <div className={s.blockMobile}>
          {currentData.map((p, i) => (
            <div className={s.blockInfo} key={i}>
              <div className={s.blockInfoChildren}>
                <span>Date of Payment:</span>
                <span>{p.dateOfPayment}</span>
              </div>
              <div className={s.blockInfoChildren}>
                <span>End data of subscription:</span>
                <span>{p.endDateOfSubscription}</span>
              </div>
              <div className={s.blockInfoChildren}>
                <span>Subscription Type:</span>
                <span>{p.subscriptionType}</span>
              </div>
              <div className={s.blockInfoChildren}>
                <span>Price:</span>
                <span>${p.price}</span>
              </div>
              <div className={s.blockInfoChildren}>
                <span>Payment Type:</span>
                <span>{p.paymentType}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={s.blockPayments}>
          <div className={s.blockTitle}>
            <span>Date of Payment</span>
            <span>End data of subscription</span>
            <span>Price</span>
            <span>Subscription Type</span>
            <span>Payment Type</span>
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
        getPageSize={getPageSizeHandler}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        pageSize={pageSize}
        totalCount={formattedData.length}
      />
    </div>
  )
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return `${day}.${month}.${year}`
}
