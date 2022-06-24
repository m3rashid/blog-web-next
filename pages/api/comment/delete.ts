import { NextApiRequest, NextApiResponse } from 'next'

import connectDb from '../../../models'
import { Comment } from '../../../models/comment'

const deleteComment = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDb()
  const { commentId } = req.body
  const deleted = await Comment.findByIdAndDelete(commentId)
  if (!deleted) throw new Error('Comment not found')

  return res.status(200).json(deleted)
}

export default deleteComment
