import { useTranslation } from '@/common/hooks/useTranslation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import s from './profileSettingsBar.module.scss'

export const ProfileSettingsBar = () => {
  const { t } = useTranslation()
  const { accountManagement, devices, generalInformation, myPayments } = t.profile.settings
  const settings = [generalInformation, devices, accountManagement, myPayments]
  const paths = ['general', 'devices', 'management', 'payments']

  return (
    <>
      <Tabs className={s.settingsList}>
        <TabsList>
          {settings.map((el, i) => (
            <TabsTrigger key={i} value={el}>
              {el}
            </TabsTrigger>
          ))}
        </TabsList>
        {settings.map((el, i) => (
          <TabsContent key={i} value={el}>
            {el}
          </TabsContent>
        ))}
      </Tabs>
    </>
  )
}
