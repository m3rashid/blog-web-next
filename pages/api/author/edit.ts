import { NextApiRequest, NextApiResponse } from 'next'

import connectDb from 'models'
import { Author } from 'models/author'

const editAuthorProfile = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDb()
  const { slug } = req.body
  const author = await Author.findOne({ slug })

  if (!author) throw new Error('Author not found')
  const newAuthor = await Author.findOneAndUpdate(
    { slug: slug },
    { $set: { ...req.body } }
  )

  return res.send(newAuthor)
}

export default editAuthorProfile
