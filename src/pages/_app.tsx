import type { AppProps } from 'next/app'

import './../styles/index.scss'
import '@fontsource-variable/inter'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
