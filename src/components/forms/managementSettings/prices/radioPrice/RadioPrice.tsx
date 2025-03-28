import { ResponseGetPricesPay } from '@/services/accountSubscriptions'
import * as RadioGroup from '@radix-ui/react-radio-group'

import s from '@/components/forms/managementSettings/managementSettings.module.scss'
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
      <RadioGroup.Item className={styles.Item} onClick={checkedRadioHandler} value={String(num)}>
        <RadioGroup.Indicator className={styles.Indicator} />
      </RadioGroup.Item>
      <label className={styles.Label} htmlFor={'r2'}>
        <span>
          <span>{price}</span>
          <span className={s.date}>{description}</span>
        </span>
      </label>
    </div>
  )
}
