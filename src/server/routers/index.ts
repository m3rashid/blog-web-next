import { createRouter } from 'server/createRouter'
// import { userRouter } from 'server/routers/user'
import { eventRouter } from 'server/routers/events'

export const appRouter = createRouter()
  // .merge('users.', userRouter)
  .merge('events.', eventRouter)

export type AppRouter = typeof appRouter
