import { Feed } from '@/components/pagesComponents/feed'
import { getBaseLayout } from '@/components/ui/layout'
import { NextPageWithLayout } from '@/pages/_app'

const FeedPage: NextPageWithLayout = () => <Feed />

FeedPage.getLayout = getBaseLayout
export default Feed
