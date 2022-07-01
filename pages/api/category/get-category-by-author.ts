import { NextApiRequest, NextApiResponse } from 'next'

import connectDb from 'models'
import { defaultHandler } from 'middlewares/default'

const getCategoriesByAuthor = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await connectDb()
}

export default defaultHandler(getCategoriesByAuthor)
