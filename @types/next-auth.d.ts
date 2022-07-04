import NextAuth, { DefaultSession } from 'next-auth'

import { IAuthorDetails } from 'components/userDetail'

declare module 'next-auth' {
  interface Session {
    user: IAuthorDetails & DefaultSession['user']
  }
}
