import { getAuthLayout } from '@/components/ui/layout/authLayout'
import { Profile } from '@/components/ui/profile'

import { NextPageWithLayout } from '../_app'

const UserProfile: NextPageWithLayout = () => {
  return (
    <>
      <Profile />
    </>
  )
}

UserProfile.getLayout = getAuthLayout
export default UserProfile
