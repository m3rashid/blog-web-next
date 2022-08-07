import * as trpc from '@trpc/server'
import { HydratedDocument, isValidObjectId } from 'mongoose'

import {
  createPostSchema,
  deletePostSchema,
  editPostSchema,
  getPostForAuthorSchema,
} from 'server/schema/post'
import { Post, IPost } from 'server/models/post'
import { bannedWordsForSlug } from 'utils/bannedWordsForSlug'
import { createProtectedRouter } from 'server/protectedRouter'

export const protectedPostRouter = createProtectedRouter()
  .mutation('createPost', {
    input: createPostSchema,
    async resolve({ ctx, input }) {
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
  .mutation('editPost', {
    input: editPostSchema,
    async resolve({ ctx, input }) {
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
  .mutation('deletePost', {
    input: deletePostSchema,
    async resolve({ ctx, input }) {
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
  .mutation('getPostsForAuthor', {
    input: getPostForAuthorSchema,
    async resolve({ ctx, input }) {
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
