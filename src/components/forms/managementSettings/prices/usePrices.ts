import { useEffect, useState } from 'react'

import { usePostSubscriptionsMutation } from '@/services/accountSubscriptions/accountSubsService'
import {
  RequestPostSubscriptions,
  ResponseGetPricesPay,
} from '@/services/accountSubscriptions/accountSubsService.types'
import { MeResponse } from '@/services/auth'
import { useRouter } from 'next/router'

type Props = {
  meInfo: MeResponse
  pricesPayment: ResponseGetPricesPay
}

export const usePrices = ({ meInfo, pricesPayment }: Props) => {
  const [postSubscriptions] = usePostSubscriptionsMutation()
  const router = useRouter()

  const [choiceSelect, setChoiceSelect] = useState<number>(
    Number(localStorage.getItem('price')) + 1 || 1
  )
  const [isDisable, setIsDisable] = useState(false)
  const [isModal, setIsModal] = useState(false)
  const [modalArguments, setModalArguments] = useState({ buttonValue: '', message: '', title: '' })

  useEffect(() => {
    if (router.query.success === 'true') {
      setModalArguments({
        buttonValue: 'Ok',
        message: 'Payment was successful!',
        title: 'Success',
      })
      setIsModal(true)

      return
    }
    if (router.query.success === 'false') {
      setModalArguments({
        buttonValue: 'Back to payment',
        message: 'Transaction failed, please try again',
        title: 'Error',
      })

      setIsModal(true)
    }
  }, [router.query])

  const clickPaymentButton = (paymentType: 'PAYPAL' | 'STRIPE') => {
    setIsDisable(true)
    const requestData: RequestPostSubscriptions = {
      amount: pricesPayment.data[Number(localStorage.getItem('price'))].amount || 10,
      baseUrl: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/profile/settings/management/${meInfo.userId}`,
      paymentType: paymentType,
      typeSubscription: pricesPayment.data[Number(localStorage.getItem('price'))].typeDescription,
    }

    postSubscriptions(requestData).then(res => {
      localStorage.setItem('statusAccount', 'BUSINESS')
      res.data?.url && router.push(res.data.url)
      setTimeout(() => {
        setIsDisable(false)
      }, 2000)
    })
  }

  const closeModal = () => {
    setIsModal(false)
    router.push(`/profile/settings/management/${meInfo.userId}`)
  }

  const checkedRadio = (type: number) => {
    localStorage.setItem('price', String(type - 1))
    setChoiceSelect(type)
  }

  return {
    checkedRadio,
    choiceSelect,
    clickPaymentButton,
    closeModal,
    isDisable,
    isModal,
    modalArguments,
  }
}
