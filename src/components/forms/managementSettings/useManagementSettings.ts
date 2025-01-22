import { useEffect, useState } from 'react'

import { useTranslation } from '@/common/hooks/useTranslation'
import { AccountTypeValue } from '@/components/forms/managementSettings/ManagementSettings'
import {
  useGetCurrentPaymentSubscriptionsQuery,
  useGetPricesPaymentQuery,
} from '@/services/accountSubscriptions/accountSubsService'
import { useMeQuery } from '@/services/auth'

export const useManagementSettings = () => {
  const { data: meInfo, isLoading: isLoadingMeInfo } = useMeQuery()
  const {
    data: currentPayment,
    isFetching: isFetchingCurrentPayment,
    isLoading: isLoadingCurrentPayment,
  } = useGetCurrentPaymentSubscriptionsQuery()
  const { data: pricesPayment, isLoading: isLoadingPricesPayment } = useGetPricesPaymentQuery()
  const [statusInit, setStatusInit] = useState(false)
  const [statusAccount, setStatusAccount] = useState<AccountTypeValue>(AccountTypeValue.Personal)
  const { t } = useTranslation()

  useEffect(() => {
    if (localStorage.getItem('statusAccount')) {
      setStatusAccount(localStorage.getItem('statusAccount') as AccountTypeValue)
      setStatusInit(true)
    }
    {
      setStatusInit(true)
    }
  }, [pricesPayment, currentPayment])

  useEffect(() => {
    if (localStorage.getItem('statusAccount')) {
      setStatusAccount(localStorage.getItem('statusAccount') as AccountTypeValue)
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
