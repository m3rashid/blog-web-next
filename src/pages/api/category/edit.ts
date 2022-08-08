import { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession as getServerSession } from 'next-auth'

import { authOptions as nextAuthOptions } from 'pages/api/auth/[...nextauth]'
import connectDb from 'server/models'
import { Category } from 'server/models/category'
import { bannedWordsForSlug } from 'utils/bannedWordsForSlug'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }
  try {
    const session = await getServerSession(req, res, nextAuthOptions)
    if (!session) return res.status(401).json('Unauthorized')

    await connectDb()
    const { categoryId, slug, name } = req.body
    if (!categoryId || !slug || !name) throw new Error('Invalid request')
    const category = await Category.findById(categoryId)
    if (!category) {
      throw new Error('Category not found')
    }

    if (bannedWordsForSlug.includes(slug)) throw new Error('Invalid Slug')

    const newCategory = await Category.updateOne(
      { _id: categoryId },
      { $set: { name, slug } }
    )
    return res.status(200).json(newCategory)
  } catch (err: any) {
    console.error(err)
    return res.status(500).json(err.message || 'Internal server error')
  }
}

export default handler
