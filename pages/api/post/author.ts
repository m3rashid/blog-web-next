import { NextApiRequest, NextApiResponse } from 'next'

import connectDb from '../../../models'
import { Post } from '../../../models/post'

const getAuthorPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDb()
  const { authorId } = req.body
  const posts = await Post.aggregate([
    // @ts-ignore
    { $match: { author: new mongoose.Types.ObjectId(authorId) } },
    {
      $lookup: {
        from: 'authors',
        localField: 'author',
        foreignField: '_id',
        as: 'author',
      },
    },
    { $unwind: { path: '$author', preserveNullAndEmptyArrays: true } },
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
        published: 1,
        categories: { name: 1, slug: 1 },
      },
    },
  ])
  return res.status(200).json(posts)
}

export default getAuthorPosts
