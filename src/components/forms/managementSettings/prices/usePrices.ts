import { useEffect, useState } from 'react'

import { useTranslation } from '@/common/hooks/useTranslation'
import { AccountTypeValue } from '@/components/forms/managementSettings'
import { PaymentType } from '@/components/forms/managementSettings/prices'
import { usePostSubscriptionsMutation } from '@/services/accountSubscriptions'
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
  const { t } = useTranslation()

  const [choiceSelect, setChoiceSelect] = useState<number>(
    Number(localStorage.getItem('price')) + 1 || 1
  )
  const [isDisable, setIsDisable] = useState(false)
  const [isModal, setIsModal] = useState(false)
  const [modalArguments, setModalArguments] = useState({ buttonValue: '', message: '', title: '' })

  useEffect(() => {
    if (router.query.success === 'true') {
      setModalArguments({
        buttonValue: t.modalMessage.Success.ok,
        message: t.modalMessage.Success.message,
        title: t.modalMessage.Success.title,
      })
      setIsModal(true)

      return
    }
    if (router.query.success === 'false') {
      setModalArguments({
        buttonValue: t.modalMessage.Error.ok,
        message: t.modalMessage.Error.message,
        title: t.modalMessage.Error.title,
      })

      setIsModal(true)
    }
  }, [router.query])

  const priceCharacteristic = pricesPayment.data[Number(localStorage.getItem('price'))]

  const clickPaymentButton = (paymentType: PaymentType) => {
    setIsDisable(true)
    const requestData: RequestPostSubscriptions = {
      amount: priceCharacteristic.amount || 10,
      baseUrl: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}${
        router.locale === 'en' ? '/en' : ''
      }/profile/settings/management/${meInfo.userId}`,
      paymentType,
      typeSubscription: priceCharacteristic.typeDescription,
    }

    postSubscriptions(requestData).then(res => {
      localStorage.setItem('statusAccount', AccountTypeValue.Business)
      res.data?.url && router.push(res.data.url)
      setTimeout(() => {
        setIsDisable(false)
      }, 2000)
    })
  }

  const closeModal = () => {
    setIsModal(false)
    router.push(
      `${router.locale === 'en' ? '/en' : ''}/profile/settings/management/${meInfo.userId}`
    )
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
