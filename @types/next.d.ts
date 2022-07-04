import { ObjectId } from 'mongoose'
import { IncomingMessage } from 'http'

declare module 'next' {
  export interface NextApiRequest extends IncomingMessage {
    user: any
  }
}
