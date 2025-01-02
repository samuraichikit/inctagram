import { useState } from 'react'

import { PayPalButtons } from '@paypal/react-paypal-js'
import { useRouter } from 'next/router'

type PropsType = {
  product: {
    description: string
    price: string
  }
}

const PaypalCheckoutButton = (props: PropsType) => {
  const { product } = props

  const router = useRouter()

  const [paidFor, setPaidFor] = useState(false)
  const [error, setError] = useState<any>(null)

  const handleApprove = (orderId: string) => {
    // Call backend function to fulfill order
    //
    // if response is success
    setPaidFor(true)
    window.close()
    // refresh user's account or subscription status
    //
    // if the response is error
    // setError('Your payment was processed successfully. However, we are unable to fulfill your purchase. Please contact us at support@designcode.io for assistance.')
  }

  if (paidFor) {
    // Display success message, modal or redirect user to success page
    alert('Thank you four your purchase!')
  }

  if (error) {
    // Display error message, modal or redirect user to error page
    alert(error)
  }

  return (
    <PayPalButtons
      createOrder={(data, actions) => {
        // @ts-ignore
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: '',
                value: product.price,
              },
              description: product.description,
            },
          ],
        })
      }}
      onApprove={async (data: any, actions: any) => {
        const order = await actions?.order.capture()

        console.log('order', order)

        handleApprove(data.orderId)
      }}
      onCancel={() => {
        //Display cancel message, modal or redirect user to cancel page or back to cart
      }}
      onClick={(data, actions) => {
        // Validate on button click, client or server side

        const hasAlreadyBoughtCourse = false

        if (hasAlreadyBoughtCourse) {
          setError('Вы уже купили подписку!')

          return actions.reject()
        } else {
          return actions.resolve()
        }
      }}
      onError={err => {
        setError(err)
        console.error('Paypal Checkout onError', err)
      }}
      style={{
        color: 'black',
        height: 55,
        layout: 'horizontal',
        shape: 'pill',
        tagline: false,
      }}
    />
  )
}

export default PaypalCheckoutButton
