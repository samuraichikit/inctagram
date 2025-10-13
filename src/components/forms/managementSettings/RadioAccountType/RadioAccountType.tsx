import { AccountTypeValue } from '@/components/forms/managementSettings'
import * as RadioGroup from '@radix-ui/react-radio-group'

import s from './radioAccountType.module.scss'

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
    <div className={s.radioAccountContainer}>
      <RadioGroup.Item className={s.item} onClick={getCheckedRadioHandler} value={value}>
        <RadioGroup.Indicator className={s.indicator} />
      </RadioGroup.Item>
      <label className={s.label} htmlFor={'r1'}>
        {accountTypeValueLanguage}
      </label>
    </div>
  )
}
