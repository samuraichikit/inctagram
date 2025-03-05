import { getAdminLayout } from '@/components/ui/layout/adminLayout'
import { NextPageWithLayout } from '@/pages/_app'

const UsersList: NextPageWithLayout = () => <div>Users List</div>

UsersList.getLayout = getAdminLayout
export default UsersList
