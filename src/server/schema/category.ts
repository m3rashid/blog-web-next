import z from 'zod'

export const createCategorySchema = z.object({
  name: z.string(),
  slug: z.string(),
})

export const editCategorySchema = createCategorySchema.partial().extend({
  categoryId: z.string(),
})

export const deleteCategorySchema = z.object({
  categoryId: z.string(),
})
