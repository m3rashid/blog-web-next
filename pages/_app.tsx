import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

import '../styles/globals.css'
import RootWrapper from '../components/globals/rootWrapper'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <RootWrapper>
        <Component {...pageProps} />
      </RootWrapper>
    </SessionProvider>
  )
}

export default MyApp
