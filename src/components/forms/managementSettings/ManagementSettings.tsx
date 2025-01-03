import { useEffect, useState } from 'react'

import { Prices } from '@/components/forms/managementSettings/prices/Prices'
import { useMeQuery } from '@/services/auth'

import s from './ManagementSettings.module.css'

export const ManagementSettings = () => {
  const { data: meInfo } = useMeQuery()
  const [statusAcc, setStatusAcc] = useState('personal')

  useEffect(() => {
    localStorage.setItem('userId', String(meInfo?.userId))
    setStatusAcc(localStorage.getItem('statusAcc') || 'personal')
  }, [meInfo])

  const checkedRadio = (type: string) => {
    localStorage.setItem('statusAcc', type)
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
