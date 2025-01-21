import { useEffect, useState } from 'react'

import { PaypalPayment } from '@/assets/icons/PaypalPayment'
import { StripePayment } from '@/assets/icons/StripePayment'
import { useTranslation } from '@/common/hooks/useTranslation'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import {
  useGetPricesPaymentQuery,
  usePostSubscriptionsMutation,
} from '@/services/accountSubscriptions/accountSubsService'
import { RequestPostSubscriptions } from '@/services/accountSubscriptions/accountSubsService.types'
import { useMeQuery } from '@/services/auth'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { useRouter } from 'next/router'

import s from '../ManagementSettings.module.scss'
import styles from '@/components/forms/managementSettings/styles.module.scss'

export const Prices = () => {
  const { data: meInfo } = useMeQuery()
  const { data } = useGetPricesPaymentQuery()
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

  const [isDisable, setIsDisable] = useState(false)

  const [isModal, setIsModal] = useState(false)
  const [title, setTitle] = useState('')
  const [textMessage, setTextMessage] = useState('')
  const [btnText, setBtnText] = useState('')

  useEffect(() => {
    if (router.query.success === 'true') {
      setTitle('Success')
      setTextMessage('Payment was successful!')
      setBtnText('Ok')
      setIsModal(true)
    } else {
      if (router.query.success === 'false') {
        setTitle('Error')
        setTextMessage('Transaction failed, please try again')
        setBtnText('Back to payment')
        setIsModal(true)
      }
    }
  }, [router.query])

  if (!data || !meInfo) {
    return <div>Loading...</div>
  }

  const clickPaymentButton = (paymentType: 'PAYPAL' | 'STRIPE') => {
    setIsDisable(true)
    const requestData: RequestPostSubscriptions = {
      amount: data.data[Number(localStorage.getItem('price'))].amount || 10,
      baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/profile/settings/management/${meInfo.userId}`,
      paymentType: paymentType,
      typeSubscription: data.data[Number(localStorage.getItem('price'))].typeDescription,
    }

    postSubscriptions(requestData).then(res => {
      res.data?.url && router.push(res.data.url)
      setIsDisable(false)
    })
  }

  const closeModal = () => {
    setIsModal(false)
    router.push(`/profile/settings/management/${meInfo.userId}`)
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
          <div>
            <div style={{ alignItems: 'center', display: 'flex' }}>
              <RadioGroup.Item className={styles.Item} onClick={() => checkedRadio(1)} value={`1`}>
                <RadioGroup.Indicator className={styles.Indicator} />
              </RadioGroup.Item>
              <label className={styles.Label} htmlFor={'r2'}>
                <span>
                  <span>
                    ${data.data[0].amount} {t.accountManagement.per} 1
                  </span>
                  <span className={s.date}>
                    {t.accountManagement[data.data[0].typeDescription]}
                  </span>
                </span>
              </label>
            </div>
          </div>
          <div>
            <div style={{ alignItems: 'center', display: 'flex' }}>
              <RadioGroup.Item className={styles.Item} onClick={() => checkedRadio(2)} value={`2`}>
                <RadioGroup.Indicator className={styles.Indicator} />
              </RadioGroup.Item>
              <label className={styles.Label} htmlFor={'r2'}>
                <span>
                  <span>
                    ${data.data[1].amount} {t.accountManagement.per} 7
                  </span>
                  <span className={s.date}>
                    {t.accountManagement[data.data[1].typeDescription]}
                  </span>
                </span>
              </label>
            </div>
          </div>
          <div>
            <div style={{ alignItems: 'center', display: 'flex' }}>
              <RadioGroup.Item className={styles.Item} onClick={() => checkedRadio(3)} value={`3`}>
                <RadioGroup.Indicator className={styles.Indicator} />
              </RadioGroup.Item>
              <label className={styles.Label} htmlFor={'r2'}>
                <span>
                  <span>
                    ${data.data[2].amount} {t.accountManagement.per}
                  </span>
                  <span className={s.date}>
                    {t.accountManagement[data.data[2].typeDescription]}
                  </span>
                </span>
              </label>
            </div>
          </div>
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
      <Modal className={s.modal} onOpenChange={closeModal} open={isModal} title={title}>
        <div>{textMessage}</div>
        {btnText.length > 0 && (
          <div style={{ marginTop: '55px' }}>
            <Button onClick={closeModal} style={{ width: '100%' }}>
              {btnText}
            </Button>
          </div>
        )}
      </Modal>
    </div>
  )
}
