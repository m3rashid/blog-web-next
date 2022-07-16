import * as trpc from '@trpc/server'
import { HydratedDocument, isValidObjectId } from 'mongoose'

import { createRouter } from 'server/createRouter'
import { bannedWordsForSlug } from 'utils/bannedWordsForSlug'
import { Category, ICategory } from 'server/models/category'
import {
  createCategorySchema,
  deleteCategorySchema,
  editCategorySchema,
} from 'server/schema/category'

export const categoryRouter = createRouter()
  .mutation('create-category', {
    input: createCategorySchema,
    async resolve({ ctx, input }) {
      if (!(await ctx).user) {
        throw new trpc.TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to comment',
        })
      }

      if (bannedWordsForSlug.includes(input.slug)) {
        throw new trpc.TRPCError({
          code: 'BAD_REQUEST',
          message: 'Invalid slug',
        })
      }

      const category: HydratedDocument<ICategory> = new Category({
        name: input.name,
        slug: input.slug,
      })

      const saved = await category.save()
      return saved
    },
  })
  .mutation('edit-category', {
    input: editCategorySchema,
    async resolve({ ctx, input }) {
      if (!(await ctx).user) {
        throw new trpc.TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to comment',
        })
      }

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
  .mutation('delete-category', {
    input: deleteCategorySchema,
    async resolve({ ctx, input }) {
      if (!(await ctx).user) {
        throw new trpc.TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to comment',
        })
      }

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
  .query('get-categories', {
    async resolve({ ctx }) {
      const categories = await Category.aggregate([
        { $project: { createdAt: 0, updatedAt: 0, __v: 0 } },
      ])
      return categories
    },
  })
