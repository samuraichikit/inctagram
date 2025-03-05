import { AdminUserPage } from '@/components/pagesComponents/admin/adminUserPage'
import { getAdminLayout } from '@/components/ui/layout/adminLayout'
import { NextPageWithLayout } from '@/pages/_app'

const UsersList: NextPageWithLayout = () => <AdminUserPage />

UsersList.getLayout = getAdminLayout
export default UsersList
