import { Devices } from '@/components/forms/device/Devices'
import { getProfileSettingsLayout } from '@/components/ui/layout/profileSettingsLayout/ProfileSettingsLayout'
import { NextPageWithLayout } from '@/pages/_app'

const MyDevicePage: NextPageWithLayout = () => <Devices />

MyDevicePage.getLayout = getProfileSettingsLayout
export default MyDevicePage
