import { PrivacyPolicy } from '@/components/forms/signUp/privacyPolicy'
import { getBaseLayout } from '@/components/ui/layout'
import { NextPageWithLayout } from '@/pages/_app'

const PrivacyPolicyPage: NextPageWithLayout = () => {
  return <PrivacyPolicy />
}

PrivacyPolicyPage.getLayout = getBaseLayout
export default PrivacyPolicyPage
