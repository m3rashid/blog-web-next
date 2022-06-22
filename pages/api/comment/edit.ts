export const editComment = async (req: Request, res: Response) => {
  const { commentId } = req.body

  const comment = await Comment.findById(commentId)
  if (!comment) throw new Error('Comment not found')

  const newComment = await Comment.updateOne(
    { _id: commentId },
    { $set: { ...req.body } }
  )
  return res.status(200).json(newComment)
}
