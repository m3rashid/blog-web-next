import { NextApiRequest, NextApiResponse } from 'next'

import connectDb from 'server/models'
import { Post } from 'server/models/post'
import { requireAuth } from 'server/middlewares/auth'

const editPost = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDb()
  const {
    postId,
    title,
    data,
    published,
    bannerImageUrl,
    keywords,
    categories,
  } = req.body
  const post = await Post.findById(postId)
  if (!post) throw new Error('Post not found')

  const updated = await post.updateOne({
    title,
    data,
    keywords,
    bannerImageUrl,
    categories,
    published,
  })
  return res.status(200).json(updated)
}

export default requireAuth(editPost)
