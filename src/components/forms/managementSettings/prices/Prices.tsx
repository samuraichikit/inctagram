import { useState } from 'react'

import PaypalCheckoutButton from '@/components/forms/managementSettings/prices/paypal/Paypal'
import { useGetPricesPaymentQuery } from '@/services/accountSubscriptions/accountSubsService'

import s from '../ManagementSettings.module.css'

export const Prices = () => {
  const { data, isLoading } = useGetPricesPaymentQuery()

  const [choiceSelect, setChoiceSelect] = useState<number>(1)

  const checkedRadio = (type: number) => {
    setChoiceSelect(type)
  }

  if (!data) {
    return <div>Loading...</div>
  }

  const desc: string = data.data[choiceSelect - 1].typeDescription
  const pricePay: string = String(data.data[choiceSelect - 1].amount)

  const product = {
    description: desc,
    price: pricePay,
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
        <PaypalCheckoutButton product={product} />
      </div>
    </div>
  )
}
