import { ConfirmedEmail } from '@/components/forms/signUp/confirmedEmail'
import { getBaseLayout } from '@/components/ui/layout'
import { NextPageWithLayout } from '@/pages/_app'

const RegistrationConfirmationPage: NextPageWithLayout = () => <ConfirmedEmail />

RegistrationConfirmationPage.getLayout = getBaseLayout
export default RegistrationConfirmationPage
