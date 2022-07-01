import { NextApiRequest, NextApiResponse } from 'next'

import connectDb from 'models'
import { Category } from 'models/category'

const getPostsByCategory = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await connectDb()
  const { slug } = req.body

  const posts = await Category.aggregate([
    { $match: { slug: slug } },
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
    return res.status(200).json([])
  }
  return res.status(200).json(posts)
}

export default getPostsByCategory
