import type { AppProps } from 'next/app'

import { Provider } from 'react-redux'

import { wrapper } from '@/app/store'
import { Layout } from '@/components/ui/layout'

import './../styles/index.scss'
import '@fontsource-variable/inter'

export default function App({ Component, ...rest }: AppProps) {
  const { props, store } = wrapper.useWrappedStore(rest)

  return (
    <Provider store={store}>
      <Layout>
        <Component {...props.pageProps} />
      </Layout>
    </Provider>
  )
}
