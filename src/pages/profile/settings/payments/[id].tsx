import { MyPayments } from '@/components/forms/myPayments/MyPayments'
import { getProfileSettingsLayout } from '@/components/ui/layout/profileSettingsLayout/ProfileSettingsLayout'
import { NextPageWithLayout } from '@/pages/_app'

const MyPaymentsPage: NextPageWithLayout = () => {
  return <MyPayments />
}

MyPaymentsPage.getLayout = getProfileSettingsLayout
export default MyPaymentsPage
