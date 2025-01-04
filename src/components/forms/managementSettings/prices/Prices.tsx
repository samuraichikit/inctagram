import { useEffect, useState } from 'react'

import { StripePayment } from '@/assets/icons/StripePayment'
import { useTranslation } from '@/common/hooks/useTranslation'
import PaypalCheckoutButton from '@/components/forms/managementSettings/prices/paypal/Paypal'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import {
  useGetPricesPaymentQuery,
  usePostSubscriptionsMutation,
} from '@/services/accountSubscriptions/accountSubsService'
import { RequestPostSubscriptions } from '@/services/accountSubscriptions/accountSubsService.types'
import { useMeQuery } from '@/services/auth'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { loadStripe } from '@stripe/stripe-js'
import { useRouter } from 'next/router'

import s from '../ManagementSettings.module.css'
import styles from '@/components/forms/managementSettings/styles.module.css'

let stripePromise: any

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string)
  }

  return stripePromise
}

export const Prices = () => {
  const { data: meInfo } = useMeQuery()
  const { data, isLoading } = useGetPricesPaymentQuery()
  const [postSubscriptions] = usePostSubscriptionsMutation()
  const router = useRouter()
  const { t } = useTranslation()

  const [choiceSelect, setChoiceSelect] = useState<number>(
    Number(localStorage.getItem('price')) + 1 || 1
  )

  const checkedRadio = (type: number) => {
    localStorage.setItem('price', String(type - 1))
    setChoiceSelect(type)
  }

  const [stripeError, setStripeError] = useState(null)
  const [successStripe, setSuccessStripe] = useState<null | string>(null)

  const [isModal, setIsModal] = useState(false)
  const [title, setTitle] = useState('')
  const [textMessage, setTextMessage] = useState('')
  const [btnText, setBtnText] = useState('')

  console.log(router.query.id && router.query.id[1])

  useEffect(() => {
    if (
      router.query.id &&
      router.query.id[1] === `success` &&
      localStorage.getItem('stripeWindow') === 'true' &&
      data
    ) {
      const payload: RequestPostSubscriptions = {
        amount: data.data[Number(localStorage.getItem('price'))].amount || 10,
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL as string,
        paymentType: 'STRIPE',
        typeSubscription: data.data[Number(localStorage.getItem('price'))].typeDescription,
      }

      postSubscriptions(payload).then(() => {
        setTitle('Success')
        setTextMessage('Payment was successful!')
        setBtnText('OK')
        setIsModal(true)
      })
    }
    if (
      router.query.id &&
      router.query.id[1] === 'cancel' &&
      localStorage.getItem('stripeWindow') === 'true'
    ) {
      setTitle('Error')
      setTextMessage('Transaction failed. Please, write to support')
      setBtnText('Back to payment')
      setIsModal(true)
    }
  }, [router.query.id, data])

  const prices = [
    'price_1Qd90zQue32akx1ngur6u5os', // $10
    'price_1Qd9KEQue32akx1nVCzXgT0u', // $50
    'price_1Qd9KjQue32akx1nM5tH66XN', // $100
  ]

  const item = {
    price: prices[choiceSelect - 1],
    quantity: 1,
  }

  const checkoutOptions = {
    cancelUrl: `${window.location.origin}/profile/settings/management/${meInfo?.userId}/cancel`,
    lineItems: [item],
    mode: 'payment',
    successUrl: `${window.location.origin}/profile/settings/management/${meInfo?.userId}/success`,
  }

  const redirectToCheckout = async () => {
    console.log('redirectToCheckout')
    localStorage.setItem('stripeWindow', 'true')

    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout(checkoutOptions)

    if (error) {
      setStripeError(error.message)
      console.log('Stripe checkout error', error)
    }
    setSuccessStripe('Успешно оплачен!')
  }

  if (successStripe) {
    alert(successStripe)
  }

  if (stripeError) {
    alert(stripeError)
  }
  if (!data || !meInfo) {
    return <div>Loading...</div>
  }

  const clickButtonHandler = () => {
    localStorage.setItem('stripeWindow', 'false')
    router.push(`/profile/settings/management/${meInfo.userId}`)
    setIsModal(false)
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
          {data?.data &&
            data.data.map((p, i) => (
              <div key={i}>
                <div style={{ alignItems: 'center', display: 'flex' }}>
                  <RadioGroup.Item
                    className={styles.Item}
                    onClick={() => checkedRadio(i + 1)}
                    value={`${i + 1}`}
                  >
                    <RadioGroup.Indicator className={styles.Indicator} />
                  </RadioGroup.Item>
                  <label className={styles.Label} htmlFor={'r2'}>
                    <span>
                      <span>
                        ${p.amount} {t.accountManagement.per}
                      </span>
                      <span className={s.date}>
                        {p.typeDescription === 'DAY'
                          ? t.accountManagement.day
                          : p.typeDescription === 'WEEKLY'
                          ? t.accountManagement.weekly
                          : t.accountManagement.monthly}
                      </span>
                    </span>
                  </label>
                </div>
              </div>
            ))}
        </RadioGroup.Root>
      </div>
      <div className={s.wrapperPayments}>
        <PaypalCheckoutButton data={data} />
        <span className={s.or}>{t.accountManagement.or}</span>
        <Button onClick={redirectToCheckout} variant={'icon'}>
          <StripePayment />
        </Button>
      </div>
      <Modal className={s.modal} onOpenChange={clickButtonHandler} open={isModal} title={title}>
        <div>{textMessage}</div>
        {btnText.length > 0 && (
          <div style={{ marginTop: '55px' }}>
            <Button onClick={clickButtonHandler} style={{ width: '100%' }}>
              {btnText}
            </Button>
          </div>
        )}
      </Modal>
    </div>
  )
}
