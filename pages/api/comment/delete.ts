export const deleteComment = async (req: Request, res: Response) => {
  const { commentId } = req.body
  const deleted = await Comment.findByIdAndDelete(commentId)
  if (!deleted) throw new Error('Comment not found')

  return res.status(200).json(deleted)
}
