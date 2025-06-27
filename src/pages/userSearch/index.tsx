import { UserSearchPage } from '@/components/pagesComponents/userSearch'
import { getBaseLayout } from '@/components/ui/layout'
import { NextPageWithLayout } from '@/pages/_app'

const UserSearch: NextPageWithLayout = () => <UserSearchPage />

UserSearch.getLayout = getBaseLayout
export default UserSearch
