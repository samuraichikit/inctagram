import { useState } from 'react'

import { PaypalPayment } from '@/assets/icons/PaypalPayment'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { usePostSubscriptionsMutation } from '@/services/accountSubscriptions/accountSubsService'
import {
  RequestPostSubscriptions,
  ResponseGetPricesPay,
} from '@/services/accountSubscriptions/accountSubsService.types'
import { useMeQuery } from '@/services/auth'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { useRouter } from 'next/router'

import s from './Paypal.module.scss'

type PropsType = {
  data: ResponseGetPricesPay
}

const PaypalCheckoutButton = (props: PropsType) => {
  const router = useRouter()
  const [postSubscriptions, { data }] = usePostSubscriptionsMutation()
  const { data: meInfo } = useMeQuery()

  console.log(data)

  const [paidFor, setPaidFor] = useState(false)
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [btnText, setBtnText] = useState('')

  const handleApprove = (data: any) => {
    // Call backend function to fulfill order
    //
    // if response is success
    if (data.orderID) {
      const payload: RequestPostSubscriptions = {
        amount: props.data.data[Number(localStorage.getItem('price'))].amount || 10,
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL as string,
        paymentType: 'PAYPAL',
        typeSubscription:
          props.data.data[Number(localStorage.getItem('price'))].typeDescription || '',
      }

      postSubscriptions(payload).then(() => {
        localStorage.setItem('price', '0')
        setTitle('Success')
        setMessage('Payment was successful!')
        setBtnText('OK')
        setPaidFor(true)
      })
      // refresh user's account or subscription status
    } else {
      // if the response is error
      setTitle('Error')
      setMessage('Transaction failed. Please, write to support')
      setBtnText('Back to payment')
      setPaidFor(true)
    }
  }

  const clickButtonHandler = () => {
    router.push(`/profile/settings/management/${meInfo?.userId}`)
    setPaidFor(false)
  }

  return (
    <>
      <span className={s.PaypalIcon}>
        <PaypalPayment />
      </span>
      <PayPalButtons
        className={s.PaypalOriginal}
        createOrder={(data, actions) => {
          // @ts-ignore
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: '',
                  value:
                    String(props.data.data[Number(localStorage.getItem('price'))].amount) || '10',
                },
                description:
                  String(props.data.data[Number(localStorage.getItem('price'))].typeDescription) ||
                  '',
              },
            ],
          })
        }}
        onApprove={async (data: any, actions: any) => {
          const order = await actions?.order.capture()

          console.log('order', data.orderID)

          handleApprove(data)
        }}
        onCancel={() => {
          //Display cancel message, modal or redirect user to cancel page or back to cart
          setTitle('Error')
          setMessage('Payment canceled!')
          setPaidFor(true)
        }}
        onClick={(data, actions) => {
          // Validate on button click, client or server side
          const hasAlreadyBoughtCourse = false

          if (hasAlreadyBoughtCourse) {
            setMessage('Вы уже купили подписку!')

            return actions.reject()
          } else {
            return actions.resolve()
          }
        }}
        style={{
          color: 'black',
          height: 55,
          layout: 'horizontal',
          shape: 'pill',
          tagline: false,
        }}
      />
      <Modal className={s.modal} onOpenChange={clickButtonHandler} open={paidFor} title={title}>
        <div>{message}</div>
        {btnText.length > 0 && (
          <div className={s.textBtn}>
            <Button onClick={clickButtonHandler} style={{ width: '100%' }}>
              {btnText}
            </Button>
          </div>
        )}
      </Modal>
    </>
  )
}

export default PaypalCheckoutButton
