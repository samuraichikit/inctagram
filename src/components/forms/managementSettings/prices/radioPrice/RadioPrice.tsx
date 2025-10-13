import { ResponseGetPricesPay } from '@/services/accountSubscriptions'
import * as RadioGroup from '@radix-ui/react-radio-group'

import styles from '@/components/forms/managementSettings/styles.module.scss'

import { Locale } from '../../../../../../locales/ru'

type Props = {
  characteristicsPrices: ResponseGetPricesPay
  checkedRadio: (num: number) => void
  daysPrice: string
  num: number
  t: Locale
}

export const RadioPrice = ({ characteristicsPrices, checkedRadio, daysPrice, num, t }: Props) => {
  const checkedRadioHandler = () => {
    checkedRadio(num)
  }

  const price = `${characteristicsPrices.data[num - 1].amount} ${
    t.accountManagement.per
  } ${daysPrice}`
  const description = `${t.accountManagement[characteristicsPrices.data[num - 1].typeDescription]}`

  return (
    <div style={{ alignItems: 'center', display: 'flex' }}>
      <RadioGroup.Item className={styles.item} onClick={checkedRadioHandler} value={String(num)}>
        <RadioGroup.Indicator className={styles.indicator} />
      </RadioGroup.Item>
      <label className={styles.label} htmlFor={'r2'}>
        <span>
          <span>{price}</span>
          <span className={styles.date}>{description}</span>
        </span>
      </label>
    </div>
  )
}
