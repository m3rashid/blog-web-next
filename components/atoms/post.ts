import { atom } from 'recoil'

export type PostType = 'text' | 'code'

export interface ICreatePost {
  id: string
  type: PostType
  content: string
}

export interface IPost {
  slug: string
  content: ICreatePost[]
}

export const postAtom = atom<ICreatePost[]>({
  key: 'post',
  default: [],
})
