import { AccountTypeValue } from '@/components/forms/managementSettings'
import * as RadioGroup from '@radix-ui/react-radio-group'

import styles from './radioAccountType.scss'

type Props = {
  accountTypeValue: AccountTypeValue
  accountTypeValueLanguage: string
  getCheckedRadio: (accountType: AccountTypeValue) => void
  value: string
}

export const RadioAccountType = ({
  accountTypeValue,
  accountTypeValueLanguage,
  getCheckedRadio,
  value,
}: Props) => {
  const getCheckedRadioHandler = () => {
    getCheckedRadio(accountTypeValue)
  }

  return (
    <div className={styles.radioAccountContainer}>
      <RadioGroup.Item className={styles.Item} onClick={getCheckedRadioHandler} value={value}>
        <RadioGroup.Indicator className={styles.Indicator} />
      </RadioGroup.Item>
      <label className={styles.Label} htmlFor={'r1'}>
        {accountTypeValueLanguage}
      </label>
    </div>
  )
}
