import { HydratedDocument, ObjectId } from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'

import connectDb from 'server/models'
import { Post } from 'server/models/post'
import { Comment, IComment } from 'server/models/comment'
import { defaultHandler } from 'server/middlewares/default'

const createComment = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDb()
  const { name, comment, postId } = req.body

  const newComment: HydratedDocument<IComment> = new Comment({ name, comment })
  const saved = await newComment.save()

  await Post.findOneAndUpdate(
    { _id: postId },
    // @ts-ignore
    { $push: { comments: saved._id } }
  )

  return res.status(200).json(saved)
}

export default defaultHandler(createComment)
