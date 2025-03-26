import { ResponseGetPricesPay } from '@/services/accountSubscriptions/accountSubsService.types'
import * as RadioGroup from '@radix-ui/react-radio-group'

import s from '@/components/forms/managementSettings/ManagementSettings.module.scss'
import styles from '@/components/forms/managementSettings/styles.module.scss'

import { Locale } from '../../../../../../locales/ru'

type Props = {
  checkedRadio: (num: number) => void
  daysPrice: string
  num: number
  pricesPayment: ResponseGetPricesPay
  t: Locale
}

export const RadioPrice = ({ checkedRadio, daysPrice, num, pricesPayment, t }: Props) => {
  const checkedRadioHandler = () => {
    checkedRadio(num)
  }

  return (
    <div style={{ alignItems: 'center', display: 'flex' }}>
      <RadioGroup.Item className={styles.Item} onClick={checkedRadioHandler} value={String(num)}>
        <RadioGroup.Indicator className={styles.Indicator} />
      </RadioGroup.Item>
      <label className={styles.Label} htmlFor={'r2'}>
        <span>
          <span>
            ${pricesPayment.data[num - 1].amount} {t.accountManagement.per} {daysPrice}
          </span>
          <span className={s.date}>
            {t.accountManagement[pricesPayment.data[num - 1].typeDescription]}
          </span>
        </span>
      </label>
    </div>
  )
}
