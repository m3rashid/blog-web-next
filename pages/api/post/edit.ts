export const editPost = async (req: Request, res: Response) => {
  const { postId, data, published, title, bannerImageUrl } = req.body
  const post = await Post.findById(postId)
  if (!post) throw new Error('Post not found')

  const updated = await post.updateOne({
    data,
    published,
    title,
    bannerImageUrl,
  })
  res.status(200).json(updated)
}
