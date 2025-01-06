import React, { useEffect, useState } from 'react'

import { useTransformDate } from '@/common/hooks/useTransformDate'
import {
  useGetCurrentPaymentSubscriptionsQuery,
  usePostCanceledAutoRenewalMutation,
} from '@/services/accountSubscriptions/accountSubsService'
import axios from 'axios'
import { getCookie } from 'cookies-next/client'

import s from '../ManagementSettings.module.scss'

export const AutoRenewal = () => {
  const { data } = useGetCurrentPaymentSubscriptionsQuery()
  const [PostCanceledAutoRenewal] = usePostCanceledAutoRenewalMutation()

  const dateOfPayment = useTransformDate(data ? data.data[0].dateOfPayment : '')
  const endDateOfSubscription = useTransformDate(data ? data.data[0].endDateOfSubscription : '')

  const [isRenewal, setIsRenewal] = useState(data?.data[0].autoRenewal)

  useEffect(() => {
    setIsRenewal(data?.data[0].autoRenewal)
  }, [data])

  useEffect(() => {
    if (data?.data[0].autoRenewal === true && !isRenewal) {
      PostCanceledAutoRenewal()
    }
  }, [isRenewal])

  if (!data) {
    return <></>
  }

  return (
    <>
      <h3 className={s.Title}>Current Subscription:</h3>
      <div className={s.wrapperDatePayments}>
        <div className={s.datePayment}>
          <span className={s.datePaymentText}>Expire at</span>
          <span>{dateOfPayment}</span>
        </div>
        <div className={s.datePayment}>
          <span className={s.datePaymentText}>Next payment</span>
          <span>{endDateOfSubscription}</span>
        </div>
      </div>
      <div className={s.autoRenewal}>
        <input
          checked={isRenewal}
          disabled={!data.data[0].autoRenewal}
          onChange={() => setIsRenewal(!isRenewal)}
          type={'checkbox'}
        />
        <span>Auto-Renewal</span>
      </div>
    </>
  )
}
