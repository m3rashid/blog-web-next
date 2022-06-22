import NextAuth from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    CredentialProvider({
      name: 'credentials',
      credentials: {
        username: {
          label: 'Email',
          type: 'text',
          placeholder: 'Johndoe@gmail.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: (credentials) => {
        if (!credentials) return null
        if (
          credentials.username === 'john' &&
          credentials.password === 'test'
        ) {
          return {
            id: 1,
            name: 'John',
            email: 'John@gmail.com',
          }
        }
        return null
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
})
