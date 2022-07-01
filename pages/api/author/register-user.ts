import bcrypt from 'bcrypt'
import { HydratedDocument } from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'

import connectDb from 'models'
import { IUser, User } from 'models/user'
import { defaultHandler } from 'middlewares/default'

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDb()
  const { email, password } = req.body

  const user = await User.findOne({
    $and: [{ email: email }, { deleted: false }],
  })
  if (user) throw new Error('User already exists')

  const hash = await bcrypt.hash(password, 12)
  const newUser: HydratedDocument<IUser> = new User({ email, password: hash })
  const savedUser = await newUser.save()

  return res.status(200).json(savedUser)
}

export default defaultHandler(register)
