import { RadioAccountType } from '@/components/forms/managementSettings/RadioAccountType'
import { AutoRenewal } from '@/components/forms/managementSettings/autoRenewal'
import { Prices } from '@/components/forms/managementSettings/prices'
import { useManagementSettings } from '@/components/forms/managementSettings/useManagementSettings'
import { useGetCurrentPaymentSubscriptionsQuery } from '@/services/accountSubscriptions/accountSubsService'
import * as RadioGroup from '@radix-ui/react-radio-group'

import s from './managementSettings.module.scss'

export enum AccountTypeValue {
  Business = 'BUSINESS',
  Personal = 'PERSONAL',
}

export const ManagementSettings = () => {
  const { data: currentPayment } = useGetCurrentPaymentSubscriptionsQuery()

  const {
    checkedRadio,
    isLoadingCurrentPayment,
    isLoadingMeInfo,
    isLoadingPricesPayment,
    meInfo,
    pricesPayment,
    statusAccount,
    statusInit,
    t,
  } = useManagementSettings()

  if (isLoadingMeInfo) {
    return <div>Loading...</div>
  }

  const statusAccountEnabled =
    statusAccount === AccountTypeValue.Business && meInfo && pricesPayment

  return (
    <>
      {currentPayment && statusInit && (
        <div>
          {currentPayment.hasAutoRenewal && currentPayment.data[0].subscriptionId && (
            <AutoRenewal
              currentPayment={currentPayment}
              isLoadingCurrentPayment={isLoadingCurrentPayment}
              t={t}
            />
          )}
          <div>
            <h3 className={s.title}>{t.accountManagement.accountType}</h3>
            <div className={s.accountTypeBlock}>
              <RadioGroup.Root
                aria-label={'Account type'}
                className={s.root}
                defaultValue={localStorage.getItem('statusAccount') || statusAccount}
              >
                <RadioAccountType
                  accountTypeValue={AccountTypeValue.Personal}
                  accountTypeValueLanguage={t.accountManagement.personal}
                  getCheckedRadio={checkedRadio}
                  value={AccountTypeValue.Personal}
                />
                <RadioAccountType
                  accountTypeValue={AccountTypeValue.Business}
                  accountTypeValueLanguage={t.accountManagement.business}
                  getCheckedRadio={checkedRadio}
                  value={AccountTypeValue.Business}
                />
              </RadioGroup.Root>
            </div>
          </div>
          {statusAccountEnabled && (
            <Prices
              isLoadingPricesPayment={isLoadingPricesPayment}
              meInfo={meInfo}
              pricesPayment={pricesPayment}
              t={t}
            />
          )}
        </div>
      )}
    </>
  )
}
