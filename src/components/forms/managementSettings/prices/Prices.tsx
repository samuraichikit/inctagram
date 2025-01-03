import { useEffect, useState } from 'react'

import PaypalCheckoutButton from '@/components/forms/managementSettings/prices/paypal/Paypal'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { useGetPricesPaymentQuery } from '@/services/accountSubscriptions/accountSubsService'
import { useMeQuery } from '@/services/auth'
import { loadStripe } from '@stripe/stripe-js'
import { useRouter } from 'next/router'

import s from '../ManagementSettings.module.css'

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
  const router = useRouter()

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
      localStorage.getItem('stripeWindow') === 'true'
    ) {
      setTitle('Success')
      setTextMessage('Payment was successful!')
      setBtnText('OK')
      setIsModal(true)
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
  }, [router.query.id])

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
    <div>
      <h3>Your subscription costs:</h3>
      <div className={s.accountTypeBlock}>
        {data?.data &&
          data?.data.map((p, i) => (
            <div className={s.radioAndText} key={i}>
              <input
                checked={choiceSelect === i + 1}
                onChange={() => checkedRadio(i + 1)}
                type={'radio'}
              />
              <span>${p.amount} per</span>
              <span className={s.term}>{p.typeDescription}</span>
            </div>
          ))}
      </div>
      <div className={s.wrapperPayments}>
        <PaypalCheckoutButton data={data} />
        <Button onClick={redirectToCheckout}>Stripe</Button>
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
