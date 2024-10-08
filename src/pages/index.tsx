import { Header } from '@/components/header/Header'
import Head from 'next/head'

import { useTranslation } from '../../hooks/useTranslation'

export default function Home() {
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>Inctagram</title>
        <meta content={'Generated by create next app'} name={'description'} />
        <meta content={'width=device-width, initial-scale=1'} name={'viewport'} />
        <link href={'/favicon.ico'} rel={'icon'} />
      </Head>
      <Header />
      <div>
        <h1>{t.test}</h1>
      </div>
    </>
  )
}
