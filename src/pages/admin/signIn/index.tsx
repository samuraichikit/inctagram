import { SignInAdmin } from '@/components/forms/signInAdmin'
import { getAdminLayout } from '@/components/ui/layout/adminLayout'
import { NextPageWithLayout } from '@/pages/_app'

const SignInAdminPage: NextPageWithLayout = () => <SignInAdmin />

SignInAdminPage.getLayout = getAdminLayout
export default SignInAdminPage
