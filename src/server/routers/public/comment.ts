import * as trpc from '@trpc/server'
import { HydratedDocument, isValidObjectId } from 'mongoose'

import { Post } from 'server/models/post'
import { createRouter } from 'server/createRouter'
import { Comment, IComment } from 'server/models/comment'
import { createCommentSchema } from 'server/schema/comment'

export const commentRouter = createRouter().mutation('createComment', {
  input: createCommentSchema,
  async resolve({ ctx, input }) {
    if (!isValidObjectId(input.postId)) {
      throw new trpc.TRPCError({
        code: 'BAD_REQUEST',
        message: 'Invalid postId',
      })
    }
    const newComment: HydratedDocument<IComment> = new Comment({
      name: input.name,
      comment: input.comment,
    })
    const saved = await newComment.save()

    await Post.findOneAndUpdate(
      { _id: input.postId },
      { comments: { $push: saved._id } }
    )
    return saved
  },
})
