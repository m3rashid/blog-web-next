import { atom } from 'recoil'

interface ICategory {
  _id: string
  name: string
  slug: string
}

export const categoryAtom = atom<ICategory[]>({
  key: 'all-categories',
  default: [],
})
