export const deleteCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.body
  const category = await Category.findById(categoryId)
  if (!category) throw new Error('Category not found')

  await Category.deleteOne({ _id: categoryId })

  return res.send('Category Deleted')
}
