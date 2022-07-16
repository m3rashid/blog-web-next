import z from 'zod'

export const createCommentSchema = z.object({
  name: z.string(),
  comment: z.string(),
  postId: z.string(),
})
