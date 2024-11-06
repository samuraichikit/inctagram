import { ForgotPassword } from '@/components/forms/forgotPassword'
import { getBaseLayout } from '@/components/ui/layout'
import { NextPageWithLayout } from '@/pages/_app'

const ForgotPasswordPage: NextPageWithLayout = () => {
  return <ForgotPassword />
}

ForgotPasswordPage.getLayout = getBaseLayout
export default ForgotPasswordPage
