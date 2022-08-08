import { NextApiRequest, NextApiResponse } from 'next'

import connectDb from 'server/models'
import { Category } from 'server/models/category'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }
  try {
    await connectDb()
    const categories = await Category.aggregate([
      { $project: { createdAt: 0, updatedAt: 0, __v: 0 } },
    ])
    return res.status(200).json(categories)
  } catch (err: any) {
    console.error(err)
    return res.status(500).json(err.message || 'Internal server error')
  }
}

export default handler
