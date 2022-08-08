import { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession as getServerSession } from 'next-auth'

import { authOptions as nextAuthOptions } from 'pages/api/auth/[...nextauth]'
import connectDb from 'server/models'
import { Category } from 'server/models/category'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }
  try {
    const session = await getServerSession(req, res, nextAuthOptions)
    if (!session) return res.status(401).json('Unauthorized')

    await connectDb()
    const { categoryId } = req.body
    if (!categoryId) throw new Error('Invalid request')
    const deleted = await Category.deleteOne({ _id: categoryId })
    if (!deleted) throw new Error('Category not found')

    return res.status(200).json('Category Deleted')
  } catch (err: any) {
    console.error(err)
    return res.status(500).json(err.message || 'Internal server error')
  }
}

export default handler
