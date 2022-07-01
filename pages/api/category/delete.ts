import { NextApiRequest, NextApiResponse } from 'next'

import connectDb from 'models'
import { Category } from 'models/category'

const deleteCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDb()
  const { categoryId } = req.body
  const category = await Category.findById(categoryId)
  if (!category) throw new Error('Category not found')

  await Category.deleteOne({ _id: categoryId })

  return res.send('Category Deleted')
}

export default deleteCategory
