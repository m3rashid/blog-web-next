import superjson from 'superjson'
import { withTRPC } from '@trpc/next'
import { SessionProvider } from 'next-auth/react'
import type { AppType } from 'next/dist/shared/lib/utils'

import 'styles/globals.css'
import { AppRouter } from 'server/routers'
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

const ONE_DAY_SECONDS = 60 * 60 * 24

export default withTRPC<AppRouter>({
  config({ ctx }) {
    if (typeof window !== 'undefined') {
      return { transformer: superjson, url: '/api/trpc' }
    }

    ctx?.res?.setHeader(
      'Cache-Control',
      `s-maxage=1, stale-while-revalidate=${ONE_DAY_SECONDS}`
    )

    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : 'http://localhost:3000/api/trpc'

    return {
      url,
      transformer: superjson,
      headers: {
        // optional - inform server that it's an ssr request
        'x-ssr': '1',
      },
    }
  },
  ssr: true,
})(MyApp)
