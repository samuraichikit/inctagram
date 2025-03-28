import { useTranslation } from '@/common/hooks/useTranslation'
import { pageProfileSettings } from '@/components/ui/layout/profileSettingsLayout/ProfileSettingsLayout'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'

import s from './profileSettingsBar.module.scss'

type Props = {
  actualPage: pageProfileSettings
}

export const ProfileSettingsBar = ({ actualPage }: Props) => {
  const { t } = useTranslation()
  const path = usePathname()
  const router = useRouter()
  const { accountManagement, devices, generalInformation, myPayments } = t.profile.settings
  const userId = path?.split('/').reverse()[0]

  const tabTriggerHandler = (page: pageProfileSettings) => {
    localStorage.setItem('selectProfileSettingPages', JSON.stringify(page))
    router.push(`/profile/settings/${page}/${userId}`)
  }

  return (
    <>
      <Tabs defaultValue={actualPage}>
        <TabsList className={s.settingsList}>
          <TabsTrigger
            className={s.settingsItem}
            onClick={() => tabTriggerHandler('general')}
            value={'general'}
          >
            {generalInformation}
          </TabsTrigger>
          <TabsTrigger
            className={s.settingsItem}
            onClick={() => tabTriggerHandler('devices')}
            value={'devices'}
          >
            {devices}
          </TabsTrigger>
          <TabsTrigger
            className={s.settingsItem}
            onClick={() => tabTriggerHandler('management')}
            value={'management'}
          >
            {accountManagement}
          </TabsTrigger>
          <TabsTrigger
            className={s.settingsItem}
            onClick={() => tabTriggerHandler('payments')}
            value={'payments'}
          >
            {myPayments}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  )
}
