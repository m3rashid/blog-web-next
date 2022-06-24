import NextAuth from 'next-auth'
import bcrypt from 'bcrypt'
import CredentialProvider from 'next-auth/providers/credentials'

import connectDb from '../../../models'
import { User } from '../../../models/user'

connectDb()

export default NextAuth({
  providers: [
    CredentialProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials) return null
        const users = await User.aggregate([
          // @ts-ignore
          { $match: { email: email, deleted: false } },
          {
            $lookup: {
              from: 'authors',
              localField: 'profile',
              foreignField: '_id',
              as: 'author',
            },
          },
          { $unwind: { path: '$author', preserveNullAndEmptyArrays: true } },
          {
            $project: {
              email: 1,
              createdAt: 1,
              updatedAt: 1,
              profile: 1,
              password: 1,
              author: { name: 1, slug: 1 },
            },
          },
        ])

        if (users.length === 0) return null

        const user = users[0]
        if (!user) return null

        const match = await bcrypt.compare(credentials.password, user.password)
        if (!match) return null
        return user
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id
      }
      return token
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id
      }
      return session
    },
  },
  secret: 'asdfasdfasdf',
  jwt: {
    secret: 'asdfasdfasdf',
  },
  pages: {
    signIn: '/auth',
    newUser: '/auth',
  },
})
