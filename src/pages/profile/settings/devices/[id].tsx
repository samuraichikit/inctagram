import { Device } from '@/components/forms/device/Devices'
import { getProfileSettingsLayout } from '@/components/ui/layout/profileSettingsLayout/ProfileSettingsLayout'
import { NextPageWithLayout } from '@/pages/_app'

const MyDevicePage: NextPageWithLayout = () => <Device />

MyDevicePage.getLayout = getProfileSettingsLayout
export default MyDevicePage
