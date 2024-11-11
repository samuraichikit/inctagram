import { useTranslation } from '@/common/hooks/useTranslation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'

import s from './profileSettingsBar.module.scss'

export const ProfileSettingsBar = () => {
  const { t } = useTranslation()

  const path = usePathname()
  const router = useRouter()
  const { accountManagement, devices, generalInformation, myPayments } = t.profile.settings
  const userId = path?.split('/').reverse()[0]
  const currentSetting = path?.split('/').reverse()[1]

  console.log(currentSetting)

  return (
    <>
      <Tabs className={s.settingsList} defaultValue={generalInformation}>
        <TabsList>
          <TabsTrigger
            onClick={() => router.push(`/profile/settings/general/${userId}`)}
            value={generalInformation}
          >
            {generalInformation}
          </TabsTrigger>
          <TabsTrigger
            onClick={() => router.push(`/profile/settings/devices/${userId}`)}
            value={devices}
          >
            {devices}
          </TabsTrigger>
          <TabsTrigger
            onClick={() => router.push(`/profile/settings/management/${userId}`)}
            value={accountManagement}
          >
            {accountManagement}
          </TabsTrigger>
          <TabsTrigger
            onClick={() => router.push(`/profile/settings/payments/${userId}`)}
            value={myPayments}
          >
            {myPayments}
          </TabsTrigger>
        </TabsList>

        <TabsContent value={generalInformation}>{generalInformation}</TabsContent>
        <TabsContent value={devices}>{devices}</TabsContent>
        <TabsContent value={accountManagement}>{accountManagement}</TabsContent>
        <TabsContent value={myPayments}>{myPayments}</TabsContent>
      </Tabs>
    </>
  )
}
