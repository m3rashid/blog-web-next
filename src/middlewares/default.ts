import { NextApiHandler } from 'next'

export const defaultHandler = (handler: NextApiHandler): NextApiHandler => {
  return async (req, res) => {
    try {
      if (req.method !== 'POST') {
        return res.status(400).json('Only Post requests are allowed')
      }

      await handler(req, res)
    } catch (err: any) {
      console.log(err.message)
      return res.status(500).json(err.message || 'Internal server error')
    }
  }
}
