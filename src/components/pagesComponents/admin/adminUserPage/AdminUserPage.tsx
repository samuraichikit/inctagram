import { AdminUserInfo } from './adminUserInfo'
import { AdminUserTabs } from './adminUserTabs'
import { BackToUsersListLink } from './backToUserListLink'

export const AdminUserPage = () => {
  return (
    <div>
      <BackToUsersListLink />
      <AdminUserInfo />
      <AdminUserTabs />
    </div>
  )
}
