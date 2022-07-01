import { NextApiRequest, NextApiResponse } from 'next'

import connectDb from 'models'
import { Post } from 'models/post'

const editPost = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDb()
  const { postId, data, published, title, bannerImageUrl } = req.body
  const post = await Post.findById(postId)
  if (!post) throw new Error('Post not found')

  const updated = await post.updateOne({
    data,
    published,
    title,
    bannerImageUrl,
  })
  res.status(200).json(updated)
}

export default editPost
