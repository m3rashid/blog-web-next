import type { AppProps } from 'next/app'
import { withTRPC } from '@trpc/next'
import { SessionProvider } from 'next-auth/react'

import 'styles/globals.css'
import { AppRouter } from 'server/routers'
import RootWrapper from 'components/globals/rootWrapper'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <RootWrapper>
        <Component {...pageProps} />
      </RootWrapper>
    </SessionProvider>
  )
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : 'http://localhost:3000/api/trpc'

    return { url }
  },
  ssr: true,
})(MyApp)
