import { HydratedDocument } from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'

import connectDb from '../../../models'
import { Category, ICategory } from '../../../models/category'
import { bannedWordsForSlug } from '../../../utils/bannedWordsForSlug'

const createCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDb()
  const { name, slug } = req.body

  if (slug.length < 5) throw new Error('Slug too short')
  if (bannedWordsForSlug.includes(slug)) throw new Error('Invalid slug')

  const category: HydratedDocument<ICategory> = new Category({ name, slug })

  const saved = await category.save()
  return res.send(saved)
}

export default createCategory
