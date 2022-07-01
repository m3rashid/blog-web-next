import { ObjectId } from 'mongoose'
import { IncomingMessage } from 'http'

import { IUser } from 'components/helpers/types'

declare module 'next' {
  export interface NextApiRequest extends IncomingMessage {
    user: IUser
  }
}
