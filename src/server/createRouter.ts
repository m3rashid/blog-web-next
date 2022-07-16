import { ZodError } from 'zod'
import superjson from 'superjson'
import { router } from '@trpc/server'

import { Context } from 'server/createContext'

export const createRouter = () =>
  router<Context>()
    .transformer(superjson)
    .formatError(({ shape, error }) => {
      return {
        ...shape,
        data: {
          ...shape.data,
          zodError:
            error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
              ? error.cause.flatten()
              : null,
        },
      }
    })
