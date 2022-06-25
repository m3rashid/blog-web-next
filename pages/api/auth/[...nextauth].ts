import bcrypt from 'bcrypt'
import NextAuth from 'next-auth'
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
          { $match: { email: credentials.email, deleted: false } },
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
        const data: any = { _id: user._id, email: user.email }
        if (user.profile) {
          data['profile'] = user.profile
          data['author'] = user.author
        }
        token.id = user.id
        token.sub = JSON.stringify(data)
      }
      return token
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id
        session.user = JSON.parse(token.sub ?? '')
      }
      return session
    },
  },
  secret: process.env.AUTH_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  pages: {
    signIn: '/auth',
  },
})
