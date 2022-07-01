import { NextApiHandler } from 'next'
import { getToken } from 'next-auth/jwt'

import { IUser } from 'components/helpers/types'

const secret = process.env.JWT_SECRET!

export const requireAuth = (handler: NextApiHandler): NextApiHandler => {
  return async (req, res) => {
    try {
      if (req.method !== 'POST') {
        return res.status(400).json('Only Post requests are allowed')
      }

      const token = await getToken({ req, secret })
      if (!token) {
        return res.status(401).json('Unauthorized')
      }
      req.user = JSON.parse(token.sub ?? '') as IUser
      await handler(req, res)
    } catch (err: any) {
      console.log(err.message)
      return res.status(500).json(err.message || 'Internal server error')
    }
  }
}
