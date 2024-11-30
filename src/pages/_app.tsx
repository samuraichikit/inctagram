import type { AppProps } from 'next/app'

import { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'

import { wrapper } from '@/app/store'
import { NotificationContainer } from '@/components/ui/notificationContainer'
import { NextPage } from 'next'

import './../styles/index.scss'
import '@fontsource-variable/inter'

export type NextPageWithLayout<P = {}, IP = P> = {
  getLayout?: (page: ReactElement) => ReactNode
} & NextPage<P, IP>

type AppPropsWithLayout = {
  Component: NextPageWithLayout
} & AppProps

export default function App({ Component, ...rest }: AppPropsWithLayout) {
  const { props, store } = wrapper.useWrappedStore(rest)

  const getLayout = Component.getLayout ?? (page => page)

  return (
    <Provider store={store}>
      {getLayout(<Component {...props.pageProps} />)}
      <NotificationContainer />
    </Provider>
  )
}
