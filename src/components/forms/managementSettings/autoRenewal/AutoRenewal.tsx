import React, { useEffect, useState } from 'react'

import { useTransformDate } from '@/common/hooks/useTransformDate'
import { useTranslation } from '@/common/hooks/useTranslation'
import {
  useGetCurrentPaymentSubscriptionsQuery,
  usePostCanceledAutoRenewalMutation,
} from '@/services/accountSubscriptions/accountSubsService'
import axios from 'axios'
import { getCookie } from 'cookies-next/client'

import s from '../ManagementSettings.module.scss'

export const AutoRenewal = () => {
  const { data } = useGetCurrentPaymentSubscriptionsQuery()
  const [postCanceledAutoRenewal] = usePostCanceledAutoRenewalMutation()

  const dateOfPayment = useTransformDate(data ? data.data[0].dateOfPayment : '')
  const endDateOfSubscription = useTransformDate(data ? data.data[0].endDateOfSubscription : '')

  const [isRenewal, setIsRenewal] = useState(data?.data[0].autoRenewal)

  const { t } = useTranslation()

  useEffect(() => {
    setIsRenewal(data?.hasAutoRenewal)
  }, [data])

  const changeCheckbox = () => {
    setIsRenewal(!isRenewal)
    postCanceledAutoRenewal()
  }

  if (!data) {
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
