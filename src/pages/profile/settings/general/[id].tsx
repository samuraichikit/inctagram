import { GeneralSettings } from '@/components/forms/generalSettings'
import { getBaseLayout } from '@/components/ui/layout'
import { NextPageWithLayout } from '@/pages/_app'

const GeneralSettingsPage: NextPageWithLayout = () => {
  return <GeneralSettings />
}

GeneralSettingsPage.getLayout = getBaseLayout
export default GeneralSettingsPage
