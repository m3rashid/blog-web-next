import { HydratedDocument } from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'

import connectDb from 'models'
import { Post } from 'models/post'
import { Comment, IComment } from 'models/comment'
import { defaultHandler } from 'middlewares/default'

const createComment = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDb()
  const { name, comment, postId } = req.body

  const newComment: HydratedDocument<IComment> = new Comment({ name, comment })
  const saved = await newComment.save()

  await Post.findOneAndUpdate(
    { _id: postId },
    { $push: { comments: saved._id } }
  )

  return res.status(200).json(saved)
}

export default defaultHandler(createComment)
