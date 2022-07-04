import { NextApiRequest, NextApiResponse } from 'next'

import connectDb from 'models'
import { Post } from 'models/post'
import { requireAuth } from 'middlewares/auth'

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
  res.status(200).json(updated)
}

export default requireAuth(editPost)
