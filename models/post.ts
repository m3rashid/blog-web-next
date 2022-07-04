import mongoose from 'mongoose'

import { IComment } from 'models/comment'
import { ICategory } from 'models/category'

export enum POST_DATA_TYPE {
  CODE = 'code',
  TEXT = 'text',
}

export interface IPostData {
  id: string
  type: 'code' | 'text'
  content: string
}

export interface IPost {
  title: string
  slug: string
  keywords: string
  data: IPostData[]
  bannerImageUrl: string
  comments?: IComment[]
  categories: ICategory[]
  published: boolean
  deleted?: boolean
}

const postSchema = new mongoose.Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    keywords: {
      type: String,
      required: true,
    },
    data: [
      {
        id: {
          type: String,
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
          enum: Object.values(POST_DATA_TYPE),
        },
      },
    ],
    bannerImageUrl: {
      type: String,
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
    published: {
      type: Boolean,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

export const Post =
  mongoose.models.Post || mongoose.model<IPost>('Post', postSchema)
