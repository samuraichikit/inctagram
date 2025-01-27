import { getAdminLayout } from '@/components/ui/layout/adminLayout'
import { NextPageWithLayout } from '@/pages/_app'

const UsersList: NextPageWithLayout = () => <div>UsersList</div>

UsersList.getLayout = getAdminLayout
export default UsersList
