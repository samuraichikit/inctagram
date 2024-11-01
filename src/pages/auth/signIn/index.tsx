import { SignIn } from '@/components/forms/signIn'
import { getBaseLayout } from '@/components/ui/layout'
import { NextPageWithLayout } from '@/pages/_app'

const SignInPage: NextPageWithLayout = () => {
  return <SignIn />
}

SignInPage.getLayout = getBaseLayout
export default SignInPage
