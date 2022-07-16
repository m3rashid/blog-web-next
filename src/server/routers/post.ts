import * as trpc from '@trpc/server'
import { HydratedDocument, isValidObjectId } from 'mongoose'

import { Post, IPost } from 'server/models/post'
import { createRouter } from 'server/createRouter'
import {
  createPostSchema,
  deletePostSchema,
  editPostSchema,
  getPostByCategorySchema,
  getPostDetailsSchema,
  getPostForAuthorSchema,
  getPostForCardSchema,
} from 'server/schema/post'
import { bannedWordsForSlug } from 'utils/bannedWordsForSlug'
import { Category } from 'server/models/category'

export const postRouter = createRouter()
  .mutation('create-post', {
    input: createPostSchema,
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
      const post: HydratedDocument<IPost> = new Post({
        title: input.title,
        slug: input.slug,
        data: input.data,
        keywords: input.keywords,
        bannerImageUrl: input.bannerImageUrl,
        categories: input.categories,
        published: input.published,
      })
      const saved = await post.save()
      return saved
    },
  })
  .mutation('edit-post', {
    input: editPostSchema,
    async resolve({ ctx, input }) {
      if (!(await ctx).user) {
        throw new trpc.TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to comment',
        })
      }

      if (!isValidObjectId(input.postId)) {
        throw new trpc.TRPCError({
          code: 'BAD_REQUEST',
          message: 'Invalid postId',
        })
      }

      const post = await Post.findById(input.postId)
      if (!post) {
        throw new trpc.TRPCError({
          code: 'NOT_FOUND',
          message: 'Post not found',
        })
      }

      const updated = await post.updateOne({
        title: input.title,
        data: input.data,
        keywords: input.keywords,
        bannerImageUrl: input.bannerImageUrl,
        categories: input.categories,
        published: input.published,
      })
      return updated
    },
  })
  .mutation('delete-post', {
    input: deletePostSchema,
    async resolve({ ctx, input }) {
      if (!(await ctx).user) {
        throw new trpc.TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to comment',
        })
      }
      const post = await Post.findOneAndUpdate(
        { slug: input.slug },
        { deleted: true }
      )
      if (!post) {
        throw new trpc.TRPCError({
          code: 'NOT_FOUND',
          message: 'Post not found',
        })
      }

      return 'Post deleted'
    },
  })
  .mutation('get-post-details', {
    input: getPostDetailsSchema,
    async resolve({ ctx, input }) {
      const posts = await Post.aggregate([
        { $match: { slug: input.slug } },
        {
          $lookup: {
            from: 'categories',
            localField: 'categories',
            foreignField: '_id',
            as: 'categories',
          },
        },
        {
          $lookup: {
            from: 'comments',
            localField: 'comments',
            foreignField: '_id',
            as: 'comments',
          },
        },
        {
          $project: {
            title: 1,
            slug: 1,
            data: 1,
            bannerImageUrl: 1,
            comments: 1,
            categories: { name: 1, slug: 1 },
            createdAt: 1,
            updatedAt: 1,
            published: 1,
          },
        },
      ])

      const relatedPosts = await Post.aggregate([
        // @ts-ignore
        { $match: { slug: input.slug, published: true } },
        {
          $lookup: {
            from: 'categories',
            localField: 'categories',
            foreignField: '_id',
            as: 'category',
          },
        },
        { $project: { _id: 0, category: { name: 1, slug: 1, _id: 1 } } },
        { $unwind: { path: '$category', preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: 'posts',
            localField: 'category._id',
            foreignField: 'categories',
            as: 'posts',
          },
        },
        {
          $project: {
            posts: {
              _id: 1,
              title: 1,
              slug: 1,
              bannerImageUrl: 1,
              createdAt: 1,
            },
          },
        },
        { $unwind: { path: '$posts', preserveNullAndEmptyArrays: true } },
        { $match: { 'posts.slug': { $ne: input.slug } } },
        {
          $project: {
            _id: '$posts._id',
            title: '$posts.title',
            slug: '$posts.slug',
            bannerImageUrl: '$posts.bannerImageUrl',
            createdAt: '$posts.createdAt',
          },
        },
        {
          $group: {
            _id: {
              _id: '$_id',
              slug: '$slug',
              title: '$title',
              bannerImageUrl: '$bannerImageUrl',
              createdAt: '$createdAt',
            },
          },
        },
        { $limit: 5 },
        {
          $project: {
            _id: '$_id._id',
            title: '$_id.title',
            slug: '$_id.slug',
            bannerImageUrl: '$_id.bannerImageUrl',
            createdAt: '$_id.createdAt',
          },
        },
      ])

      return {
        postDetail: posts[0],
        relatedPosts: relatedPosts,
      }
    },
  })
  .mutation('get-posts-card', {
    input: getPostForCardSchema,
    async resolve({ ctx, input }) {
      const posts = await Post.aggregate([
        { $limit: 6 },
        {
          $lookup: {
            from: 'categories',
            localField: 'categories',
            foreignField: '_id',
            as: 'categories',
          },
        },
        {
          $project: {
            title: 1,
            slug: 1,
            bannerImageUrl: 1,
            categories: { name: 1, slug: 1, _id: 1 },
          },
        },
      ])
      return posts
    },
  })
  .mutation('get-posts-by-category', {
    input: getPostByCategorySchema,
    async resolve({ ctx, input }) {
      const posts = await Category.aggregate([
        { $match: { slug: input.slug } },
        {
          $lookup: {
            from: 'posts',
            localField: '_id',
            foreignField: 'categories',
            as: 'posts',
          },
        },
        { $project: { name: 0, slug: 0, createdAt: 0, updatedAt: 0, __v: 0 } },
        { $unwind: { path: '$posts', preserveNullAndEmptyArrays: false } },
        {
          $project: {
            title: '$posts.title',
            slug: '$posts.slug',
            bannerImageUrl: '$posts.bannerImageUrl',
            categories: '$posts.categories',
          },
        },
        {
          $lookup: {
            from: 'categories',
            localField: 'categories',
            foreignField: '_id',
            as: 'categories',
          },
        },
        { $project: { categories: { createdAt: 0, updatedAt: 0, __v: 0 } } },
      ])

      if (!posts || posts.length === 0) {
        return []
      }
      return posts
    },
  })
  .mutation('get-posts-for-author', {
    input: getPostForAuthorSchema,
    async resolve({ ctx, input }) {
      if (!(await ctx).user) {
        throw new trpc.TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to comment',
        })
      }

      const posts = await Post.aggregate([
        {
          $lookup: {
            from: 'categories',
            localField: 'categories',
            foreignField: '_id',
            as: 'categories',
          },
        },
        {
          $project: {
            title: 1,
            slug: 1,
            bannerImageUrl: 1,
            published: 1,
            categories: { name: 1, slug: 1, _id: 1 },
          },
        },
      ])

      return posts
    },
  })
