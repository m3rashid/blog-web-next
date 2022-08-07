import superjson from 'superjson'

import { createRouter } from 'server/createRouter'
import { postRouter } from 'server/routers/public/post'
import { commentRouter } from 'server/routers/public/comment'
import { categoryRouter } from 'server/routers/public/category'
import { protectedPostRouter } from 'server/routers/protected/post'
import { protectedCategoryRouter } from 'server/routers/protected/category'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('post.', postRouter)
  .merge('comment.', commentRouter)
  .merge('category.', categoryRouter)
  .merge('pro_post.', protectedPostRouter)
  .merge('pro_category.', protectedCategoryRouter)

export type AppRouter = typeof appRouter
