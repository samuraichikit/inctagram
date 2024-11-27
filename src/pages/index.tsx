import { useEffect, useState } from 'react'

import { useAuth } from '@/common/hooks/useAuth'
import { useGoogleAuth } from '@/common/hooks/useGoogleAuth'
import { PublicPage } from '@/components/pagesComponents/publicPage/PublicPage'
import { getBaseLayout } from '@/components/ui/layout'
import { useMeQuery } from '@/services/auth'
import { PublicPostResponse, publicPostsService } from '@/services/publicPosts'
import { publicUserService } from '@/services/publicUser'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { NextPageWithLayout } from './_app'

type Props = {
  posts: PublicPostResponse[]
  totalCount: number
}

export const getStaticProps: GetStaticProps = async () => {
  const { totalCount } = await publicUserService.getTotalUsers()
  const { items: posts } = await publicPostsService.getPublicPosts()

  return {
    props: {
      posts,
      totalCount,
    },
    revalidate: 60,
  }
}

const Home: NextPageWithLayout<Props> = ({ posts, totalCount }) => {
  const router = useRouter()
  const { data: meInfo } = useMeQuery()
  const { isLoading } = useGoogleAuth()
  const [accessToken, setAccessToken] = useState<boolean | null | string>(false)

  useEffect(() => {
    setAccessToken(localStorage.getItem('accessToken'))
  }, [])

  if (accessToken) {
    router.push(`/profile/${meInfo?.userId}`)
  }

  if (isLoading) {
    return <div>LOADING ...</div>
  }

  return (
    <>
      <Head>
        <title>Inctagram</title>
        <meta content={'Generated by create next app'} name={'description'} />
        <meta content={'width=device-width, initial-scale=1'} name={'viewport'} />
        <link href={'/favicon.ico'} rel={'icon'} />
      </Head>
      <>
        <PublicPage posts={posts} totalUsers={totalCount} />
      </>
    </>
  )
}

Home.getLayout = getBaseLayout
export default Home
