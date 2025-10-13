import { ExpiredLink } from '@/components/forms/emailLinkExpired'
import { getBaseLayout } from '@/components/ui/layout'
import { NextPageWithLayout } from '@/pages/_app'

const ExpiredLinkPage: NextPageWithLayout = () => <ExpiredLink />

ExpiredLinkPage.getLayout = getBaseLayout
export default ExpiredLinkPage
