import { NextApiRequest, NextApiResponse } from 'next'

import connectDb from 'server/models'
import { Comment } from 'server/models/comment'
import { defaultHandler } from 'server/middlewares/default'

const editComment = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDb()
  const { commentId } = req.body

  const comment = await Comment.findById(commentId)
  if (!comment) throw new Error('Comment not found')

  const newComment = await Comment.updateOne(
    { _id: commentId },
    { $set: { ...req.body } }
  )
  return res.status(200).json(newComment)
}

export default defaultHandler(editComment)
