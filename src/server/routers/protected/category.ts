import * as trpc from '@trpc/server'
import { HydratedDocument } from 'mongoose'

import {
  createCategorySchema,
  deleteCategorySchema,
  editCategorySchema,
} from 'server/schema/category'
import { Category, ICategory } from 'server/models/category'
import { bannedWordsForSlug } from 'utils/bannedWordsForSlug'
import { createProtectedRouter } from 'server/protectedRouter'

export const protectedCategoryRouter = createProtectedRouter()
  .mutation('createCategory', {
    input: createCategorySchema,
    async resolve({ ctx, input }) {
      if (bannedWordsForSlug.includes(input.slug)) {
        throw new trpc.TRPCError({
          code: 'BAD_REQUEST',
          message: 'Invalid slug',
        })
      }

      const { name, slug } = input
      const category: HydratedDocument<ICategory> = new Category({ name, slug })

      const saved = await category.save()
      return saved
    },
  })
  .mutation('editCategory', {
    input: editCategorySchema,
    async resolve({ ctx, input }) {
      const category = await Category.findById(input.categoryId)
      if (!category) {
        throw new trpc.TRPCError({
          code: 'NOT_FOUND',
          message: 'Category not found',
        })
      }

      if (input.slug && bannedWordsForSlug.includes(input.slug)) {
        throw new trpc.TRPCError({
          code: 'BAD_REQUEST',
          message: 'Invalid slug',
        })
      }

      const newCategory = await Category.updateOne(
        { _id: input.categoryId },
        { $set: { ...input } }
      )
      return newCategory
    },
  })
  .mutation('deleteCategory', {
    input: deleteCategorySchema,
    async resolve({ ctx, input }) {
      const deleted = await Category.deleteOne({ _id: input.categoryId })
      if (!deleted) {
        throw new trpc.TRPCError({
          code: 'NOT_FOUND',
          message: 'Category not found',
        })
      }

      return 'Category Deleted'
    },
  })
