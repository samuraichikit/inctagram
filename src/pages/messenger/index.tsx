import Messenger from '@/components/pagesComponents/messenger/Messenger'
import { getBaseLayout } from '@/components/ui/layout'
import { NextPageWithLayout } from '@/pages/_app'

const MessengerPage: NextPageWithLayout = () => <Messenger />

MessengerPage.getLayout = getBaseLayout
export default MessengerPage
