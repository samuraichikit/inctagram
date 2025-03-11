import React, { useEffect, useState } from 'react'

import { useAppDispatch } from '@/app/store'
import { useTransformDate } from '@/common/hooks/useTransformDate'
import { setIsLoading } from '@/components/pagesComponents/app/service/app.slice'
import { usePostCanceledAutoRenewalMutation } from '@/services/accountSubscriptions/accountSubsService'
import { ResponseCurrPaymentSubs } from '@/services/accountSubscriptions/accountSubsService.types'

import s from '../ManagementSettings.module.scss'

import { Locale } from '../../../../../locales/ru'
type Props = {
  currentPayment: ResponseCurrPaymentSubs
  isLoadingCurrentPayment: boolean
  t: Locale
}

export const AutoRenewal = ({ currentPayment, isLoadingCurrentPayment, t }: Props) => {
  const dispatch = useAppDispatch()
  const [postCanceledAutoRenewal] = usePostCanceledAutoRenewalMutation()

  const dateOfPayment = useTransformDate(currentPayment ? currentPayment.data[0].dateOfPayment : '')
  const endDateOfSubscription = useTransformDate(
    currentPayment ? currentPayment.data[0].endDateOfSubscription : ''
  )

  const [isRenewal, setIsRenewal] = useState(currentPayment?.data[0].autoRenewal)

  useEffect(() => {
    setIsRenewal(currentPayment?.hasAutoRenewal)
  }, [currentPayment])

  const changeCheckbox = () => {
    dispatch(setIsLoading({ isLoading: true }))
    localStorage.setItem('statusAccount', 'BUSINESS')
    setIsRenewal(!isRenewal)
    postCanceledAutoRenewal().then(() => {
      dispatch(setIsLoading({ isLoading: false }))
    })
  }

  if (isLoadingCurrentPayment) {
    return <>Loading...</>
  }

  return (
    <>
      <h3 className={s.Title}>{t.blockAutoRenewal.CurrentSubscription}:</h3>
      <div className={s.wrapperDatePayments}>
        <div className={s.datePayment}>
          <span className={s.datePaymentText}>{t.blockAutoRenewal.ExpireAt}</span>
          <span>{dateOfPayment}</span>
        </div>
        <div className={s.datePayment}>
          <span className={s.datePaymentText}>{t.blockAutoRenewal.NextPayment}</span>
          <span>{endDateOfSubscription}</span>
        </div>
      </div>
      <div className={s.autoRenewal}>
        <input
          checked={isRenewal}
          disabled={!isRenewal}
          onChange={changeCheckbox}
          type={'checkbox'}
        />
        <span>{t.blockAutoRenewal.AutoRenewal}</span>
      </div>
    </>
  )
}
