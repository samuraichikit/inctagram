import { RadioAccountType } from '@/components/forms/managementSettings/RadioAccountType/RadioAccountType'
import { AutoRenewal } from '@/components/forms/managementSettings/autoRenewal/AutoRenewal'
import { Prices } from '@/components/forms/managementSettings/prices/Prices'
import { useManagementSettings } from '@/components/forms/managementSettings/useManagementSettings'
import { useGetCurrentPaymentSubscriptionsQuery } from '@/services/accountSubscriptions/accountSubsService'
import * as RadioGroup from '@radix-ui/react-radio-group'

import s from './ManagementSettings.module.scss'
import styles from './styles.module.scss'

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

  if (!currentPayment) {
    return <div></div>
  }

  if (isLoadingMeInfo) {
    return <div>Loading...</div> // todo - скелетоны сделать
  }

  const statusAccountEnabled =
    statusAccount === AccountTypeValue.Business && meInfo && pricesPayment

  return (
    <>
      {statusInit && (
        <div>
          {currentPayment.hasAutoRenewal && (
            <AutoRenewal
              currentPayment={currentPayment}
              isLoadingCurrentPayment={isLoadingCurrentPayment}
              t={t}
            />
          )}
          <div>
            <h3 className={s.Title}>{t.accountManagement.accountType}</h3>
            <div className={s.accountTypeBlock}>
              <RadioGroup.Root
                aria-label={'Account type'}
                className={styles.Root}
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
