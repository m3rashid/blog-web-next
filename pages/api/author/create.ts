import { HydratedDocument } from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'

import connectDb from 'models'
import { User } from 'models/user'
import { Author, IAuthor } from 'models/author'
import { bannedWordsForSlug } from 'utils/bannedWordsForSlug'

const createAuthorProfile = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await connectDb()
  const userId = req.userId

  const {
    name,
    slug,
    bio,
    avatar,
    website,
    githubUrl,
    twitterUrl,
    facebookUrl,
    instagramUrl,
    linkedinUrl,
    youtubeUrl,
  } = req.body

  if (slug.length < 5) throw new Error('Slug too short')
  if (bannedWordsForSlug.includes(slug)) throw new Error('Invalid slug')

  const author: HydratedDocument<IAuthor> = new Author({
    name,
    slug,
    bio,
    avatar,
    website,
    githubUrl,
    twitterUrl,
    facebookUrl,
    instagramUrl,
    linkedinUrl,
    youtubeUrl,
  })
  const saved = await author.save()
  const savedAuth = await User.findByIdAndUpdate(userId, { profile: saved._id })

  return res.status(200).json({ author: saved, user: savedAuth })
}

export default createAuthorProfile
