import { CreateNewPassword } from '@/components/forms/createNewPassword'
import { getBaseLayout } from '@/components/ui/layout'
import { NextPageWithLayout } from '@/pages/_app'

const RecoveryPage: NextPageWithLayout = () => {
  return <CreateNewPassword />
}

RecoveryPage.getLayout = getBaseLayout
export default RecoveryPage
