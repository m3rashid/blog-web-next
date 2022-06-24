import mongoose from 'mongoose'

export interface IAuthor {
  name: string
  slug: string
  bio: string
  avatar: string
  website?: string
  githubUrl?: string
  twitterUrl?: string
  facebookUrl?: string
  instagramUrl?: string
  linkedinUrl?: string
  youtubeUrl?: string
  deleted: boolean
}

const authorSchema = new mongoose.Schema<IAuthor>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    website: { type: String },
    githubUrl: { type: String },
    twitterUrl: { type: String },
    facebookUrl: { type: String },
    instagramUrl: { type: String },
    linkedinUrl: { type: String },
    youtubeUrl: { type: String },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

export const Author =
  mongoose.models.Author || mongoose.model<IAuthor>('Author', authorSchema)
