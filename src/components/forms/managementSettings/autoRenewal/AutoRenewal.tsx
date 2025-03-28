import React, { useEffect, useState } from 'react'

import { formatDate } from '@/common/utils'
import { AccountTypeValue } from '@/components/forms/managementSettings'
import { usePostCanceledAutoRenewalMutation } from '@/services/accountSubscriptions/accountSubsService'
import { ResponseCurrPaymentSubs } from '@/services/accountSubscriptions/accountSubsService.types'

import s from '../managementSettings.module.scss'

import { Locale } from '../../../../../locales/ru'

type Props = {
  currentPayment: ResponseCurrPaymentSubs
  isLoadingCurrentPayment: boolean
  t: Locale
}

export const AutoRenewal = ({ currentPayment, isLoadingCurrentPayment, t }: Props) => {
  const [postCanceledAutoRenewal] = usePostCanceledAutoRenewalMutation()
  const dateOfPayment = formatDate(currentPayment ? currentPayment.data[0].dateOfPayment : '')
  const endDateOfSubscription = formatDate(
    currentPayment ? currentPayment.data[0].endDateOfSubscription : ''
  )

  const [isRenewal, setIsRenewal] = useState(currentPayment?.data[0].autoRenewal)

  useEffect(() => {
    setIsRenewal(currentPayment?.hasAutoRenewal)
  }, [currentPayment])

  const changeCheckbox = () => {
    localStorage.setItem('statusAccount', AccountTypeValue.Business)
    setIsRenewal(!isRenewal)
    postCanceledAutoRenewal()
  }

  if (isLoadingCurrentPayment) {
    return <>Loading...</>
  }

  return (
    <>
      <h3 className={s.title}>{t.blockAutoRenewal.CurrentSubscription}:</h3>
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
