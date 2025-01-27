import type { AppProps } from 'next/app'

import { ReactElement, ReactNode } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { Provider } from 'react-redux'

import { wrapper } from '@/app/store'
import { useLoader } from '@/common/hooks/useLoader'
import { NotificationContainer } from '@/components/ui/notificationContainer'
import { ScrollArea } from '@/components/ui/scrollArea'
import { client } from '@/services/admin'
import { ApolloProvider } from '@apollo/client'
import { PayPalScriptProvider, ReactPayPalScriptOptions } from '@paypal/react-paypal-js'
import { NextPage } from 'next'

import '@/styles/index.scss'
import '@/styles/nprogress.scss'
import '@fontsource-variable/inter'
import '@stripe/stripe-js'

export type NextPageWithLayout<P = {}, IP = P> = {
  getLayout?: (page: ReactElement) => ReactNode
} & NextPage<P, IP>

type AppPropsWithLayout = {
  Component: NextPageWithLayout
} & AppProps

export default function App({ Component, ...rest }: AppPropsWithLayout) {
  const { props, store } = wrapper.useWrappedStore(rest)

  useLoader()

  const getLayout = Component.getLayout ?? (page => page)

  // @ts-ignore
  return (
    <SkeletonTheme baseColor={'#397df6'} highlightColor={'#73a5ff'}>
      <PayPalScriptProvider
        options={
          {
            ['client-id']: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
          } as unknown as ReactPayPalScriptOptions
        }
      >
        <ApolloProvider client={client}>
          <Provider store={store}>
            <ScrollArea style={{ marginTop: '60px' }}>
              {getLayout(<Component {...props.pageProps} />)}
              <NotificationContainer />
            </ScrollArea>
          </Provider>
        </ApolloProvider>
      </PayPalScriptProvider>
    </SkeletonTheme>
  )
}
