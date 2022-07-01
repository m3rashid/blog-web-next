import { NextApiRequest, NextApiResponse } from 'next'

import connectDb from 'models'
import { Post } from 'models/post'
import { defaultHandler } from 'middlewares/default'

const getPostsForCard = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDb()
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
  res.status(200).json(posts)
}

export default defaultHandler(getPostsForCard)
