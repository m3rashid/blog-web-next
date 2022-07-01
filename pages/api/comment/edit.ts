import { NextApiRequest, NextApiResponse } from 'next'

import connectDb from 'models'
import { Comment } from 'models/comment'

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

export default editComment
