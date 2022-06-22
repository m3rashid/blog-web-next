export const deletePost = async (req: Request, res: Response) => {
  const { slug } = req.body
  const post = await Post.findOneAndUpdate({ slug }, { deleted: true })
  res.status(200).json('Post Deleted')
}
