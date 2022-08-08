import { HydratedDocument } from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession as getServerSession } from 'next-auth'

import { authOptions as nextAuthOptions } from 'pages/api/auth/[...nextauth]'
import connectDb from 'server/models'
import { Category, ICategory } from 'server/models/category'
import { bannedWordsForSlug } from 'utils/bannedWordsForSlug'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }
  try {
    const session = await getServerSession(req, res, nextAuthOptions)
    if (!session) return res.status(401).json('Unauthorized')

    const { name, slug } = req.body
    if (!name || !slug) throw new Error('Invalid request')

    await connectDb()
    if (bannedWordsForSlug.includes(slug)) throw new Error('Invalid slug')

    const category: HydratedDocument<ICategory> = new Category({ name, slug })

    const saved = await category.save()
    return res.status(200).json(saved)
  } catch (err: any) {
    console.error(err)
    return res.status(500).json(err.message || 'Internal server error')
  }
}

export default handler
