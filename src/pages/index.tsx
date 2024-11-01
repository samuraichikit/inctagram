import { LangSelect } from '@/components/langSelect/LangSelect'
import { getBaseLayout } from '@/components/ui/layout'
import Head from 'next/head'

import { useTranslation } from '../common/hooks/useTranslation'
import { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => {
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>Inctagram</title>
        <meta content={'Generated by create next app'} name={'description'} />
        <meta content={'width=device-width, initial-scale=1'} name={'viewport'} />
        <link href={'/favicon.ico'} rel={'icon'} />
      </Head>
      <div>
        <LangSelect />
      </div>
    </>
  )
}

Home.getLayout = getBaseLayout
export default Home
