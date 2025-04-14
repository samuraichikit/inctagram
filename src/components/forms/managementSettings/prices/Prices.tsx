import { PaypalPayment } from '@/assets/icons/PaypalPayment'
import { StripePayment } from '@/assets/icons/StripePayment'
import { RadioPrice } from '@/components/forms/managementSettings/prices/radioPrice'
import { usePrices } from '@/components/forms/managementSettings/prices/usePrices'
import { Modal } from '@/components/ui/modal'
import { ResponseGetPricesPay } from '@/services/accountSubscriptions'
import { MeResponse } from '@/services/auth'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { Button } from '@samuraichikit/inc-ui-kit'

import s from '../managementSettings.module.scss'
import styles from '@/components/forms/managementSettings/styles.module.scss'

import { Locale } from '../../../../../locales/ru'

export enum PaymentType {
  Paypal = 'PAYPAL',
  Stripe = 'STRIPE',
}

const prices = [
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

  const btnCloseModal = modalArguments.buttonValue.length > 0 && (
    <div style={{ marginTop: '55px' }}>
      <Button onClick={closeModal} style={{ width: '100%' }}>
        {modalArguments.buttonValue}
      </Button>
    </div>
  )

  return (
    <div className={s.blockPrices}>
      <h3 className={s.title}>{t.accountManagement.priceSubscription}</h3>
      <div className={s.accountTypeBlock}>
        <RadioGroup.Root
          aria-label={'Account type'}
          className={styles.root}
          defaultValue={String(choiceSelect)}
        >
          {prices.map(p => (
            <RadioPrice
              characteristicsPrices={pricesPayment}
              checkedRadio={checkedRadio}
              daysPrice={p.day}
              key={p.id}
              num={p.id}
              t={t}
            />
          ))}
        </RadioGroup.Root>
      </div>
      <div className={s.wrapperPayments}>
        <Button
          className={isDisable ? s.loading : ''}
          disabled={isDisable}
          onClick={() => clickPaymentButton(PaymentType.Paypal)}
          variant={'icon'}
        >
          <PaypalPayment />
        </Button>
        <span className={s.or}>{t.accountManagement.or}</span>
        <Button
          className={isDisable ? s.loading : ''}
          disabled={isDisable}
          onClick={() => clickPaymentButton(PaymentType.Stripe)}
          variant={'icon'}
        >
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
        {btnCloseModal}
      </Modal>
    </div>
  )
}
