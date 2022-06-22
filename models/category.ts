import mongoose from 'mongoose'

export interface ICategory {
  name: string
  slug: string
}

const categorySchema = new mongoose.Schema<ICategory>(
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
  },
  { timestamps: true }
)

export const Category = mongoose.model<ICategory>('Category', categorySchema)
