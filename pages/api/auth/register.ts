export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await User.findOne({
    $and: [{ email: email }, { deleted: false }],
  })
  if (user) throw new Error('User already exists')

  const hash = await bcrypt.hash(password, 12)
  const newUser: HydratedDocument<IUser> = new User({ email, password: hash })
  const savedUser = await newUser.save()

  const token = issueJWT(savedUser._id)
  return res.status(200).json({ user: savedUser, token })
}
