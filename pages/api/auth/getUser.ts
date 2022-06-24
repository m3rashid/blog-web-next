import { Types } from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'
import connectDb from '../../../models'

export const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  connectDb()
  const { userId } = req

  // @ts-ignore
  const users = await User.aggregate([
    { $match: { _id: new Types.ObjectId(userId), deleted: false } },
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
        author: { name: 1, slug: 1 },
      },
    },
  ])

  if (users.length === 0) throw new Error('User not found')
  const user = users[0]
  if (!user) throw new Error('User not found')

  return res.status(200).json(user)
}
