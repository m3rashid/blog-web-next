import { NextApiRequest, NextApiResponse } from 'next'

import connectDb from 'server/models'
import { Post } from 'server/models/post'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }
  try {
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
  } catch (err: any) {
    console.error(err)
    return res.status(500).json(err.message || 'Internal server error')
  }
}

export default handler
