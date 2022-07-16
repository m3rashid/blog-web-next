import z from 'zod'

export const createPostSchema = z.object({
  title: z.string(),
  slug: z.string(),
  data: z.array(
    z.object({
      id: z.string(),
      type: z.enum(['code', 'text']),
      content: z.string(),
    })
  ),
  bannerImageUrl: z.string(),
  keywords: z.string(),
  categories: z.array(z.string()),
  published: z.boolean(),
})

export const editPostSchema = createPostSchema.partial().extend({
  postId: z.string(),
})

export const deletePostSchema = z.object({
  slug: z.string(),
})

export const getPostDetailsSchema = z.object({
  slug: z.string(),
})

export const getPostForCardSchema = z.object({})

export const getPostByCategorySchema = z.object({
  slug: z.string(),
})

export const getPostForAuthorSchema = z.object({})
