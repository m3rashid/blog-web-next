import { createRouter } from 'server/createRouter'
import { categoryRouter } from 'server/routers/category'
import { postRouter } from 'server/routers/post'
import { commentRouter } from 'server/routers/comment'

export const appRouter = createRouter()
  .merge('post.', postRouter)
  .merge('category.', categoryRouter)
  .merge('comment.', commentRouter)

export type AppRouter = typeof appRouter
