import { NextApiRequest, NextApiResponse } from 'next'

import connectDb from 'models'

const getCategoriesByAuthor = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await connectDb()
}

export default getCategoriesByAuthor
