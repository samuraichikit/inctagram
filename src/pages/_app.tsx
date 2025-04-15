import type { AppProps } from 'next/app'

import { ReactElement, ReactNode } from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'
import { Provider } from 'react-redux'

import { wrapper } from '@/app/store'
import { useConnectSocket } from '@/common/hooks/useConnectSocket'
import { useLoader } from '@/common/hooks/useLoader'
import { NotificationContainer } from '@/components/ui/notificationContainer'
import { client } from '@/services/admin'
import { ApolloProvider } from '@apollo/client'
import { PayPalScriptProvider, ReactPayPalScriptOptions } from '@paypal/react-paypal-js'
import { ScrollArea } from '@samuraichikit/inc-ui-kit'
import { NextPage } from 'next'

import '@/styles/nprogress.scss'
import '@fontsource-variable/inter'
import '@samuraichikit/inc-ui-kit/dist/index.css'
import '@stripe/stripe-js'
import 'react-loading-skeleton/dist/skeleton.css'

export type NextPageWithLayout<P = {}, IP = P> = {
  getLayout?: (page: ReactElement) => ReactNode
} & NextPage<P, IP>

type AppPropsWithLayout = {
  Component: NextPageWithLayout
} & AppProps

export default function App({ Component, ...rest }: AppPropsWithLayout) {
  const { props, store } = wrapper.useWrappedStore(rest)

  useLoader()
  useConnectSocket()

  const getLayout = Component.getLayout ?? (page => page)

  return (
    <SkeletonTheme baseColor={'#0d0d0d'} highlightColor={'#333'}>
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
