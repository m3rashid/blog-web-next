export const createComment = async (req: Request, res: Response) => {
  const { name, comment, postId } = req.body

  const newComment: HydratedDocument<IComment> = new Comment({ name, comment })
  const saved = await newComment.save()

  const savedPost = await Post.findOneAndUpdate(
    { _id: postId },
    { $push: { comments: saved._id } }
  )

  return res.status(200).json(saved)
}
