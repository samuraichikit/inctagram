import { useTranslation } from '@/common/hooks/useTranslation'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'

import s from './profileSettingsBar.module.scss'

export const ProfileSettingsBar = () => {
  const { t } = useTranslation()
  const path = usePathname()
  const router = useRouter()
  const { accountManagement, devices, generalInformation, myPayments } = t.profile.settings
  const userId = path?.split('/').reverse()[0]

  return (
    <>
      <Tabs defaultValue={generalInformation}>
        <TabsList className={s.settingsList}>
          <TabsTrigger
            className={s.settingsItem}
            onClick={() => router.push(`/profile/settings/general/${userId}`)}
            value={generalInformation}
          >
            {generalInformation}
          </TabsTrigger>
          <TabsTrigger
            className={s.settingsItem}
            onClick={() => router.push(`/profile/settings/devices/${userId}`)}
            value={devices}
          >
            {devices}
          </TabsTrigger>
          <TabsTrigger
            className={s.settingsItem}
            onClick={() => router.push(`/profile/settings/management/${userId}`)}
            value={accountManagement}
          >
            {accountManagement}
          </TabsTrigger>
          <TabsTrigger
            className={s.settingsItem}
            onClick={() => router.push(`/profile/settings/payments/${userId}`)}
            value={myPayments}
          >
            {myPayments}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  )
}
