import { NextApiRequest, NextApiResponse } from 'next'

import connectDb from '../../../models'
import { Category } from '../../../models/category'

const getAllCategories = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDb()
  const categories = await Category.aggregate([
    { $project: { createdAt: 0, updatedAt: 0, __v: 0 } },
  ])
  return res.status(200).json(categories)
}

export default getAllCategories
