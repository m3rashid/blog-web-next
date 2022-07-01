import { ObjectId } from 'mongoose'

export interface IAuthor {
  _id?: string
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
  createdAt?: string
  updatedAt?: string
}

export interface ICategory {
  _id?: string
  name: string
  slug: string
}

export interface IPostCardForCard {
  _id: string
  title: string
  slug: string
  bannerImageUrl: string
  categories: {
    _id: string
    name: string
    slug: string
  }[]
}

export interface IAuthState {
  user: {
    _id: string
    email: string
    createdAt: string
    updatedAt: string
    profile: string
    author?: {
      name: string
      slug: string
    }
  }
  isAuthenticated: boolean
}

export interface IRelatedPosts {
  _id: string
  title: string
  slug: string
  bannerImageUrl: string
  createdAt: string
}

export interface IUser {
  id: ObjectId | string
  email: string
  profile?: ObjectId | string
  author?: {
    name: string
    slug: string
  }
}
