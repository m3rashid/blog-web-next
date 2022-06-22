export const createCategory = async (req: Request, res: Response) => {
  const { name, slug } = req.body

  if (slug.length < 5) throw new Error('Slug too short')
  if (bannedWordsForSlug.includes(slug)) throw new Error('Invalid slug')

  const category: HydratedDocument<ICategory> = new Category({ name, slug })

  const saved = await category.save()
  return res.send(saved)
}
