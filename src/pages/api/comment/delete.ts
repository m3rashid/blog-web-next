import { NextApiRequest, NextApiResponse } from 'next'

import connectDb from 'server/models'
import { Comment } from 'server/models/comment'
import { defaultHandler } from 'server/middlewares/default'

const deleteComment = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDb()
  const { commentId } = req.body
  const deleted = await Comment.findByIdAndDelete(commentId)
  if (!deleted) throw new Error('Comment not found')

  return res.status(200).json(deleted)
}

export default defaultHandler(deleteComment)