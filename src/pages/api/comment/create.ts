import { NextApiRequest, NextApiResponse } from 'next'
import { HydratedDocument, isValidObjectId } from 'mongoose'

import connectDb from 'server/models'
import { Post } from 'server/models/post'
import { Comment, IComment } from 'server/models/comment'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }
  try {
    await connectDb()
    const { postId, name, comment } = req.body

    if (!name || !comment) throw new Error('Invalid request')
    if (!postId || !isValidObjectId(postId)) throw new Error('Invalid postId')
    const newComment: HydratedDocument<IComment> = new Comment({
      name,
      comment,
    })
    const saved = await newComment.save()

    await Post.findOneAndUpdate(
      { _id: postId },
      // @ts-ignore
      { $push: { comments: saved._id } }
    )
    return res.status(200).json(saved)
  } catch (err: any) {
    console.error(err)
    return res.status(500).json(err.message || 'Internal server error')
  }
}

export default handler
