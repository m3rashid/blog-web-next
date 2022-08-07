import {
  getPostByCategorySchema,
  getPostDetailsSchema,
  getPostForCardSchema,
} from 'server/schema/post'
import { Post } from 'server/models/post'
import { Category } from 'server/models/category'
import { createRouter } from 'server/createRouter'

export const postRouter = createRouter()
  .mutation('getPostDetails', {
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
  .mutation('getPostsCard', {
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
  .mutation('getPostsByCategory', {
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
