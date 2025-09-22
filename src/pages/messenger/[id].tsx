import Messenger from '@/components/pagesComponents/messenger/Messenger'
import { MessengerLayout } from '@/components/pagesComponents/messenger/messengerLayout/MessengerLayout'
import { getBaseLayout } from '@/components/ui/layout'
import { NextPageWithLayout } from '@/pages/_app'

const MessengerPage: NextPageWithLayout = () => <Messenger />

MessengerPage.getLayout = page => getBaseLayout(<MessengerLayout>{page}</MessengerLayout>)
export default MessengerPage
