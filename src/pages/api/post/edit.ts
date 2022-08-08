import { isValidObjectId } from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession as getServerSession } from 'next-auth'

import { authOptions as nextAuthOptions } from 'pages/api/auth/[...nextauth]'
import connectDb from 'server/models'
import { Post } from 'server/models/post'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }
  try {
    const session = await getServerSession(req, res, nextAuthOptions)
    if (!session) return res.status(401).json('Unauthorized')

    await connectDb()
    const {
      title,
      data,
      bannerImageUrl,
      keywords,
      categories,
      published,
      postId,
    } = req.body
    if (!postId) throw new Error('Invalid request')

    if (!isValidObjectId(postId)) throw new Error('Invalid postId')

    const post = await Post.findById(postId)
    if (!post) throw new Error('Post not found')

    const updates = {
      title,
      data,
      keywords,
      bannerImageUrl,
      categories,
      published,
    }

    const updated = await post.updateOne({ ...updates })
    return res.status(200).json(updated)
  } catch (err: any) {
    console.error(err)
    return res.status(500).json(err.message || 'Internal server error')
  }
}

export default handler
