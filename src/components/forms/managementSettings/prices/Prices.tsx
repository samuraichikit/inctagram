import { PaypalPayment } from '@/assets/icons/PaypalPayment'
import { StripePayment } from '@/assets/icons/StripePayment'
import { RadioPrice } from '@/components/forms/managementSettings/prices/radioPrice/RadioPrice'
import { usePrices } from '@/components/forms/managementSettings/prices/usePrices'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { ResponseGetPricesPay } from '@/services/accountSubscriptions/accountSubsService.types'
import { MeResponse } from '@/services/auth'
import * as RadioGroup from '@radix-ui/react-radio-group'

import s from '../ManagementSettings.module.scss'
import styles from '@/components/forms/managementSettings/styles.module.scss'

import { Locale } from '../../../../../locales/ru'

const price = [
  { day: '1', id: 1 },
  { day: '7', id: 2 },
  { day: '', id: 3 },
]

type Props = {
  isLoadingPricesPayment: boolean
  meInfo: MeResponse
  pricesPayment: ResponseGetPricesPay
  t: Locale
}

export const Prices = ({ isLoadingPricesPayment, meInfo, pricesPayment, t }: Props) => {
  const {
    checkedRadio,
    choiceSelect,
    clickPaymentButton,
    closeModal,
    isDisable,
    isModal,
    modalArguments,
  } = usePrices({ meInfo, pricesPayment })

  if (isLoadingPricesPayment) {
    return <div>Loading...</div>
  }

  return (
    <div className={s.blockPrices}>
      <h3 className={s.Title}>{t.accountManagement.priceSubscription}</h3>
      <div className={s.accountTypeBlock}>
        <RadioGroup.Root
          aria-label={'Account type'}
          className={styles.Root}
          defaultValue={String(choiceSelect)}
        >
          {price.map(p => (
            <RadioPrice
              checkedRadio={checkedRadio}
              daysPrice={p.day}
              key={p.id}
              num={p.id}
              pricesPayment={pricesPayment}
              t={t}
            />
          ))}
        </RadioGroup.Root>
      </div>
      <div className={s.wrapperPayments}>
        <Button disabled={isDisable} onClick={() => clickPaymentButton('PAYPAL')} variant={'icon'}>
          <PaypalPayment />
        </Button>
        <span className={s.or}>{t.accountManagement.or}</span>
        <Button disabled={isDisable} onClick={() => clickPaymentButton('STRIPE')} variant={'icon'}>
          <StripePayment />
        </Button>
      </div>
      <Modal
        className={s.modal}
        onOpenChange={closeModal}
        open={isModal}
        title={modalArguments.title}
      >
        <div>{modalArguments.message}</div>
        {modalArguments.buttonValue.length > 0 && (
          <div style={{ marginTop: '55px' }}>
            <Button onClick={closeModal} style={{ width: '100%' }}>
              {modalArguments.buttonValue}
            </Button>
          </div>
        )}
      </Modal>
    </div>
  )
}
