import { ManagementSettings } from '@/components/forms/managementSettings'
import { getProfileSettingsLayout } from '@/components/ui/layout/profileSettingsLayout/ProfileSettingsLayout'
import { NextPageWithLayout } from '@/pages/_app'

const ManagementSettingsPage: NextPageWithLayout = () => <ManagementSettings />

ManagementSettingsPage.getLayout = getProfileSettingsLayout
export default ManagementSettingsPage
