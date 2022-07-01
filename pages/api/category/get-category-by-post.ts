import { NextApiRequest, NextApiResponse } from 'next'

import connectDb from 'models'

const getCategoriesByPost = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await connectDb()
}

export default getCategoriesByPost
