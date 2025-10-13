import { SignUp } from '@/components/forms/signUp'
import { getBaseLayout } from '@/components/ui/layout'
import { NextPageWithLayout } from '@/pages/_app'

const SignUpPage: NextPageWithLayout = () => <SignUp />

SignUpPage.getLayout = getBaseLayout
export default SignUpPage
