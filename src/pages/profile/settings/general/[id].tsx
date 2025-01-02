import { GeneralSettings } from '@/components/forms/generalSettings'
import { getProfileSettingsLayout } from '@/components/ui/layout/profileSettingsLayout/ProfileSettingsLayout'
import { NextPageWithLayout } from '@/pages/_app'

const GeneralSettingsPage: NextPageWithLayout = () => {
  return <GeneralSettings />
}

GeneralSettingsPage.getLayout = getProfileSettingsLayout
export default GeneralSettingsPage
