import type { AppProps } from 'next/app'

import { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'

import { wrapper } from '@/app/store'
import { useLoader } from '@/common/hooks/useLoader'
import { NotificationContainer } from '@/components/ui/notificationContainer'
import { ScrollArea } from '@/components/ui/scrollArea'
import { PayPalScriptProvider, ReactPayPalScriptOptions } from '@paypal/react-paypal-js'
import { NextPage } from 'next'

import '@/styles/index.scss'
import '@/styles/nprogress.scss'
import '@fontsource-variable/inter'

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
    <PayPalScriptProvider
      options={
        {
          ['client-id']: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
        } as unknown as ReactPayPalScriptOptions
      }
    >
      <Provider store={store}>
        <ScrollArea style={{ marginTop: '60px' }}>
          {getLayout(<Component {...props.pageProps} />)}
          <NotificationContainer />
        </ScrollArea>
      </Provider>
    </PayPalScriptProvider>
  )
}
