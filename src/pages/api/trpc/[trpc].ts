import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'

import { createContext } from 'server/createContext'
import { appRouter } from 'server/routers'

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createContext,
  onError({ error }) {
    if (error.code === 'INTERNAL_SERVER_ERROR')
      console.error('Something went wrong', error)
    else console.error(error)
  },
})
