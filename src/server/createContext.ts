import { getToken } from 'next-auth/jwt'
import { NextApiRequest, NextApiResponse } from 'next'

import { IAuthorDetails } from 'components/data/userDetail'
import connectDb from 'server/models'

export async function createContext({
  req,
  res,
}: {
  req: NextApiRequest
  res: NextApiResponse
}) {
  await connectDb()
  const token = await getToken({ req, secret: process.env.JWT_SECRET! })
  if (!token) return { req, res, user: null }

  const user = JSON.parse(token.sub ?? '') as IAuthorDetails
  return { req, res, user }
}

export type Context = ReturnType<typeof createContext>
