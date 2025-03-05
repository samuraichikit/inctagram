import s from './adminUserPage.module.scss'

import { AdminUserInfo } from './adminUserInfo'
import { AdminUserTabs } from './adminUserTabs'
import { BackToUsersListLink } from './backToUserListLink'

export const AdminUserPage = () => {
  const classNames = {
    container: s.container,
  }

  return (
    <div className={classNames.container}>
      <BackToUsersListLink />
      <AdminUserInfo />
      <AdminUserTabs />
    </div>
  )
}
