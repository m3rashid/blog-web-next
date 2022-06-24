import { atom } from 'recoil'

interface ICategory {
  label: string
  value: string
  slug: string
}

export const categoryAtom = atom<ICategory[]>({
  key: 'all-categories',
  default: [],
})
