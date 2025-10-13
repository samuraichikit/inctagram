import { useEffect, useState } from 'react'

import { useTranslation } from '@/common/hooks/useTranslation'
import {
  useGetCurrentPaymentSubscriptionsQuery,
  useGetPricesPaymentQuery,
} from '@/services/accountSubscriptions'
import { useMeQuery } from '@/services/auth'

import { AccountTypeValue } from './ManagementSettings'

export const useManagementSettings = () => {
  const { data: meInfo, isLoading: isLoadingMeInfo } = useMeQuery()
  const { data: currentPayment, isLoading: isLoadingCurrentPayment } =
    useGetCurrentPaymentSubscriptionsQuery()
  const { data: pricesPayment, isLoading: isLoadingPricesPayment } = useGetPricesPaymentQuery()
  const [statusInit, setStatusInit] = useState(false)
  const [statusAccount, setStatusAccount] = useState<AccountTypeValue>(AccountTypeValue.Personal)
  const { t } = useTranslation()

  const setStatusAccountLocalStorage = localStorage.getItem('statusAccount') as AccountTypeValue

  useEffect(() => {
    if (localStorage.getItem('statusAccount')) {
      setStatusAccount(setStatusAccountLocalStorage)
      setStatusInit(true)
    }
    {
      setStatusInit(true)
    }
  }, [pricesPayment, currentPayment])

  useEffect(() => {
    if (localStorage.getItem('statusAccount')) {
      setStatusAccount(setStatusAccountLocalStorage)
    }
  }, [meInfo, currentPayment])

  useEffect(() => {
    if (currentPayment?.data[0]) {
      if (currentPayment?.data[0].autoRenewal === false) {
        const time = new Date()

        if (currentPayment?.data[0].endDateOfSubscription >= time.toLocaleString()) {
          localStorage.setItem('statusAccount', AccountTypeValue.Personal)
        }
      }
    }
  }, [])

  const checkedRadio = (type: AccountTypeValue) => {
    setStatusAccount(type)
    localStorage.setItem('statusAccount', type)
  }

  return {
    checkedRadio,
    isLoadingCurrentPayment,
    isLoadingMeInfo,
    isLoadingPricesPayment,
    meInfo,
    pricesPayment,
    statusAccount,
    statusInit,
    t,
  }
}
