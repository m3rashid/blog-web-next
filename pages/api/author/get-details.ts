import { NextApiRequest, NextApiResponse } from 'next'

import connectDb from 'models'
import { Author } from 'models/author'
import { defaultHandler } from 'middlewares/default'

const getAuthorDetails = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDb()
  const { slug } = req.body
  const author = await Author.findOne({ slug })

  return res.status(200).json(author)
}

export default defaultHandler(getAuthorDetails)
