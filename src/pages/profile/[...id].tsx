import { getBaseLayout } from '@/components/ui/layout'
import { Profile } from '@/components/ui/profile'

import { NextPageWithLayout } from '../_app'

const UserProfile: NextPageWithLayout = () => {
  return (
    <>
      <Profile />
    </>
  )
}

UserProfile.getLayout = getBaseLayout

export default UserProfile
