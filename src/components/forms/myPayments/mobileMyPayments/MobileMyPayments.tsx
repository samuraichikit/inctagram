import React from 'react'

import { myPaymentType } from '@/services/accountSubscriptions/accountSubsService.types'

import s from '@/components/forms/myPayments/MyPayments.module.scss'

import { Locale } from '../../../../../locales/ru'

type PropsType = {
  currentData: myPaymentType[]
  t: Locale
}

export const MobileMyPayments = ({ currentData, t }: PropsType) => {
  return (
    <div className={s.blockMobile}>
      {currentData.map((p, i) => (
        <div className={s.blockInfo} key={i}>
          <div className={s.blockInfoChildren}>
            <span>{t.myPayments.DateOfPayment}:</span>
            <span>{p.dateOfPayment}</span>
          </div>
          <div className={s.blockInfoChildren}>
            <span>{t.myPayments.EndDataOfSubscription}:</span>
            <span>{p.endDateOfSubscription}</span>
          </div>
          <div className={s.blockInfoChildren}>
            <span>{t.myPayments.SubscriptionType}:</span>
            <span>{p.subscriptionType}</span>
          </div>
          <div className={s.blockInfoChildren}>
            <span>{t.myPayments.Price}:</span>
            <span>${p.price}</span>
          </div>
          <div className={s.blockInfoChildren}>
            <span>{t.myPayments.PaymentType}:</span>
            <span>{p.paymentType}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
