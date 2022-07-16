import { NextApiRequest, NextApiResponse } from 'next'

import connectDb from 'server/models'
import { Category } from 'server/models/category'
import { requireAuth } from 'server/middlewares/auth'

const deleteCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDb()
  const { categoryId } = req.body
  const category = await Category.findById(categoryId)
  if (!category) throw new Error('Category not found')

  await Category.deleteOne({ _id: categoryId })

  return res.send('Category Deleted')
}

export default requireAuth(deleteCategory)
