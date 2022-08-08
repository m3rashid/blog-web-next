import { SessionProvider } from 'next-auth/react'
import type { AppType } from 'next/dist/shared/lib/utils'

import 'styles/globals.css'
import RootWrapper from 'components/globals/rootWrapper'

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <RootWrapper>
        <Component {...pageProps} />
      </RootWrapper>
    </SessionProvider>
  )
}

export default MyApp
