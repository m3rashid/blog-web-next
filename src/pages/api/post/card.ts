import { NextApiRequest, NextApiResponse } from 'next'

import connectDb from 'server/models'
import { Post } from 'server/models/post'
import { defaultHandler } from 'server/middlewares/default'

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
  return res.status(200).json(posts)
}

export default defaultHandler(getPostsForCard)
