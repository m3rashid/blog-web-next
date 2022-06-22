import mongoose from 'mongoose'

export interface IComment {
  name: string
  comment: string
}

const commentSchema = new mongoose.Schema<IComment>(
  {
    name: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

export const Comment = mongoose.model<IComment>('Comment', commentSchema)
