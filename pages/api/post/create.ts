export const createPost = async (req: Request, res: Response) => {
  const { title, slug, data, bannerImageUrl, authorId, categories, published } =
    req.body

  if (slug.length < 5) throw new Error('Slug too short')
  if (bannedWordsForSlug.includes(slug)) throw new Error('Invalid slug')

  const post: HydratedDocument<IPost> = new Post({
    title,
    slug,
    data,
    bannerImageUrl,
    author: authorId,
    categories,
    published,
  })
  const saved = await post.save()
  res.status(201).json(saved)
}
