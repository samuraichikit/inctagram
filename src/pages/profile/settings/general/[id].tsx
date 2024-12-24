import { GeneralSettings } from '@/components/forms/generalSettings'
import { getAuthLayout } from '@/components/ui/layout/authLayout'
import { NextPageWithLayout } from '@/pages/_app'

const GeneralSettingsPage: NextPageWithLayout = () => {
  return <GeneralSettings />
}

GeneralSettingsPage.getLayout = getAuthLayout
export default GeneralSettingsPage
