export const getAllCategories = async (req: Request, res: Response) => {
  const categories = await Category.find()
  res.json(categories)
}
