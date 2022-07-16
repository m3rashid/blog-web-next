import { HydratedDocument } from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'

import connectDb from 'server/models'
import { IPost, Post } from 'server/models/post'
import { requireAuth } from 'server/middlewares/auth'
import { bannedWordsForSlug } from 'utils/bannedWordsForSlug'

const createPost = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDb()
  const { title, slug, data, bannerImageUrl, keywords, categories, published } =
    req.body

  if (bannedWordsForSlug.includes(slug)) throw new Error('Invalid slug')

  const post: HydratedDocument<IPost> = new Post({
    title,
    slug,
    data,
    keywords,
    bannerImageUrl,
    categories,
    published,
  })
  const saved = await post.save()
  return res.status(201).json(saved)
}

export default requireAuth(createPost)
