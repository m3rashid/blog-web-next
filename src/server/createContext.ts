import { getToken } from 'next-auth/jwt'
import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from 'utils/prisma'
import { IAuthorDetails } from 'components/data/userDetail'

export async function createContext({
  req,
  res,
}: {
  req: NextApiRequest
  res: NextApiResponse
}) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET! })
  if (!token) return { req, res, prisma }

  const user = JSON.parse(token.sub ?? '') as IAuthorDetails
  return { req, res, prisma, user }
}

export type Context = ReturnType<typeof createContext>
