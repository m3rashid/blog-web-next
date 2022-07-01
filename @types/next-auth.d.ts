import 'next-auth'

interface IUser {
  id: string
  email: string
  profile?: string
  author?: {
    name: string
    slug: string
  }
}

declare module 'next-auth/client' {
  export interface DefaultSession {
    user: IUser
  }
}
