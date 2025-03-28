import React from 'react'

import { myPaymentType } from '@/services/accountSubscriptions'

import s from '@/components/forms/myPayments/MyPayments.module.scss'

type Props = {
  myPayment: myPaymentType
}

export const SubscriptionHistory = ({ myPayment }: Props) => {
  const { dateOfPayment, endDateOfSubscription, paymentType, price, subscriptionType } = myPayment

  return (
    <div className={s.blockInfoPrice}>
      <span>{dateOfPayment}</span>
      <span>{endDateOfSubscription}</span>
      <span className={s.Price}>
        <span>${price}</span>
      </span>
      <span className={s.SubsType}>{subscriptionType}</span>
      <span className={s.PaymentType}>{paymentType}</span>
    </div>
  )
}
