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
    const { slug } = req.body
    if (!slug) throw new Error('Invalid request')
    const post = await Post.findOneAndUpdate({ slug }, { deleted: true })
    if (!post) throw new Error('Post not found')

    return res.status(200).json('Post deleted')
  } catch (err: any) {
    console.error(err)
    return res.status(500).json(err.message || 'Internal server error')
  }
}

export default handler
