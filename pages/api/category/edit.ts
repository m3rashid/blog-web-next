import { NextApiRequest, NextApiResponse } from 'next'

import connectDb from '../../../models'
import { Category } from '../../../models/category'

const editCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDb()
  const { categoryId } = req.body
  const category = await Category.findById(categoryId)
  if (!category) throw new Error('Category not found')

  const newCategory = await Category.updateOne(
    { _id: categoryId },
    { $set: { ...req.body } }
  )
  return res.send(newCategory)
}

export default editCategory
