import { HydratedDocument } from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'

import connectDb from 'server/models'
import { requireAuth } from 'server/middlewares/auth'
import { Category, ICategory } from 'server/models/category'
import { bannedWordsForSlug } from 'utils/bannedWordsForSlug'

const createCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDb()
  const { name, slug } = req.body
  if (bannedWordsForSlug.includes(slug)) throw new Error('Invalid slug')

  const category: HydratedDocument<ICategory> = new Category({ name, slug })

  const saved = await category.save()
  return res.send(saved)
}

export default requireAuth(createCategory)
