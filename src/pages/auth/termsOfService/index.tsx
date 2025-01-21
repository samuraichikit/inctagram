import { TermsOfService } from '@/components/forms/signUp/termsOfService'
import { getBaseLayout } from '@/components/ui/layout'
import { NextPageWithLayout } from '@/pages/_app'

const TermsOfServicePage: NextPageWithLayout = () => <TermsOfService />

TermsOfServicePage.getLayout = getBaseLayout
export default TermsOfServicePage
