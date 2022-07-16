import { NextApiRequest, NextApiResponse } from 'next'

import connectDb from 'server/models'
import { Post } from 'server/models/post'
import { requireAuth } from 'server/middlewares/auth'

const deletePost = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDb()
  const { slug } = req.body
  await Post.findOneAndUpdate({ slug }, { deleted: true })
  return res.status(200).json('Post Deleted')
}

export default requireAuth(deletePost)
