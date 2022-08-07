import * as trpcNext from '@trpc/server/adapters/next'

import { appRouter } from 'server/routers'
import { createContext } from 'server/createContext'

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createContext,
  onError({ error }) {
    if (error.code === 'INTERNAL_SERVER_ERROR')
      console.error('Something went wrong', error)
    else console.error(error)
  },
})
