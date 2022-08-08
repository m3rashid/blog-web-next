import { HydratedDocument } from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession as getServerSession } from 'next-auth'

import { authOptions as nextAuthOptions } from 'pages/api/auth/[...nextauth]'
import connectDb from 'server/models'
import { IPost, Post } from 'server/models/post'
import { bannedWordsForSlug } from 'utils/bannedWordsForSlug'

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
      slug,
      data,
      bannerImageUrl,
      keywords,
      categories,
      published,
    } = req.body
    if (
      !title ||
      !slug ||
      !data ||
      !bannerImageUrl ||
      !keywords ||
      !categories ||
      !published
    ) {
      throw new Error('Invalid request')
    }

    if (bannedWordsForSlug.includes(slug)) throw new Error('Invalid Slug')

    const post: HydratedDocument<IPost> = new Post({
      title,
      slug,
      data,
      keywords,
      bannerImageUrl,
      categories,
      published,
    })
    const saved = await post.save()
    return res.status(200).json(saved)
  } catch (err: any) {
    console.error(err)
    return res.status(500).json(err.message || 'Internal server error')
  }
}

export default handler
