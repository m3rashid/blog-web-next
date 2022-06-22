import { Author } from '../../../models/author'

export const editAuthorProfile = async (req: Request, res: Response) => {
  const { slug } = req.body
  const author = await Author.findOne({ slug })

  if (!author) throw new Error('Author not found')
  const newAuthor = await Author.findOneAndUpdate(
    { slug: slug },
    { $set: { ...req.body } }
  )

  return res.send(newAuthor)
}
