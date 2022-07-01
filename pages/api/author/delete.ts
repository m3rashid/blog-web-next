import { NextApiRequest, NextApiResponse } from 'next'

import connectDb from 'models'
import { Author } from 'models/author'
import { requireAuth } from 'middlewares/auth'

const deleteAuthorProfile = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await connectDb()
  const { authorId } = req.body
  const author = await Author.findById(authorId)
  if (!author) throw new Error('Author not found')

  author.deleted = true
  const saved = await author.save()
  return res.send(saved)
}

export default requireAuth(deleteAuthorProfile)
