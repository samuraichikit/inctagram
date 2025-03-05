import { UserList } from '@/components/pagesComponents/admin/usersList'
import { getAdminLayout } from '@/components/ui/layout/adminLayout'
import { NextPageWithLayout } from '@/pages/_app'

const UsersList: NextPageWithLayout = () => (
  <div>
    <UserList />
  </div>
)

UsersList.getLayout = getAdminLayout
export default UsersList
