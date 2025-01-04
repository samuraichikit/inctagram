import { useEffect, useState } from 'react'

import { useTranslation } from '@/common/hooks/useTranslation'
import { Prices } from '@/components/forms/managementSettings/prices/Prices'
import { useMeQuery } from '@/services/auth'
import * as RadioGroup from '@radix-ui/react-radio-group'

import s from './ManagementSettings.module.css'
import styles from './styles.module.css'

export const ManagementSettings = () => {
  const { data: meInfo } = useMeQuery()
  const [statusAcc, setStatusAcc] = useState('personal')
  const { t } = useTranslation()

  useEffect(() => {
    localStorage.setItem('userId', String(meInfo?.userId))
    setStatusAcc(localStorage.getItem('statusAcc') || 'personal')
  }, [meInfo])

  const checkedRadio = (type: string) => {
    setStatusAcc(type)
    localStorage.setItem('statusAcc', type)
  }

  if (!meInfo) {
    return <div>Loading...</div> // todo - скелетоны сделать
  }

  return (
    <div>
      <div>
        <h3 className={s.Title}>{t.accountManagement.accountType}</h3>
        <div className={s.accountTypeBlock}>
          <RadioGroup.Root
            aria-label={'Account type'}
            className={styles.Root}
            defaultValue={statusAcc}
          >
            <div style={{ alignItems: 'center', display: 'flex' }}>
              <RadioGroup.Item
                className={styles.Item}
                onClick={() => checkedRadio('personal')}
                value={'personal'}
              >
                <RadioGroup.Indicator className={styles.Indicator} />
              </RadioGroup.Item>
              <label className={styles.Label} htmlFor={'r1'}>
                {t.accountManagement.personal}
              </label>
            </div>
            <div style={{ alignItems: 'center', display: 'flex' }}>
              <RadioGroup.Item
                className={styles.Item}
                onClick={() => checkedRadio('business')}
                value={'business'}
              >
                <RadioGroup.Indicator className={styles.Indicator} />
              </RadioGroup.Item>
              <label className={styles.Label} htmlFor={'r2'}>
                {t.accountManagement.business}
              </label>
            </div>
          </RadioGroup.Root>
        </div>
      </div>
      {statusAcc === 'business' && <Prices />}
    </div>
  )
}
