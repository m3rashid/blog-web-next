export const editCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.body
  const category = await Category.findById(categoryId)
  if (!category) throw new Error('Category not found')

  const newCategory = await Category.updateOne(
    { _id: categoryId },
    { $set: { ...req.body } }
  )
  return res.send(newCategory)
}
