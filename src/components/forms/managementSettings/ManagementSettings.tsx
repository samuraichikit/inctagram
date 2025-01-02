import { useState } from 'react'

import { Prices } from '@/components/forms/managementSettings/prices/Prices'

import s from './ManagementSettings.module.css'

type statusAccType = 'business' | 'personal'

export const ManagementSettings = () => {
  const [statusAcc, setStatusAcc] = useState<statusAccType>('personal')

  const checkedRadio = (type: statusAccType) => {
    setStatusAcc(type)
  }

  return (
    <div>
      <div>
        <h3>Account type:</h3>
        <div className={s.accountTypeBlock}>
          <div className={s.radioAndText}>
            <input
              checked={statusAcc === 'personal'}
              onChange={() => checkedRadio('personal')}
              type={'radio'}
            />
            <span>Personal</span>
          </div>
          <div className={s.radioAndText}>
            <input
              checked={statusAcc === 'business'}
              onChange={() => checkedRadio('business')}
              type={'radio'}
            />
            <span>Business</span>
          </div>
        </div>
      </div>
      {statusAcc === 'business' && <Prices />}
    </div>
  )
}
