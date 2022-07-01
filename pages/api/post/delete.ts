import { NextApiRequest, NextApiResponse } from 'next'

import connectDb from 'models'
import { Post } from 'models/post'
import { requireAuth } from 'middlewares/auth'

const deletePost = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDb()
  const { slug } = req.body
  const post = await Post.findOneAndUpdate({ slug }, { deleted: true })
  res.status(200).json('Post Deleted')
}

export default requireAuth(deletePost)
