import router from 'next/router'
import type { AppType } from 'next/dist/shared/lib/utils'

import 'styles/globals.css'
import RootWrapper from 'components/globals/rootWrapper'
import Loading from 'components/loading'
import { useState } from 'react'

const MyApp: AppType = ({ Component, pageProps }) => {
  const [loading, setloading] = useState(false)
  router.events.on('routeChangeStart', () => setloading(true))
  router.events.on('routeChangeComplete', () => setloading(false))

  return (
    <RootWrapper>
      {loading ? <Loading /> : <Component {...pageProps} />}
    </RootWrapper>
  )
}

export default MyApp
