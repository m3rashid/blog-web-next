import { Author } from '../../../models/author'

export const deleteAuthorProfile = async (req: Request, res: Response) => {
  const { authorId } = req.body
  const author = await Author.findById(authorId)
  if (!author) throw new Error('Author not found')

  author.deleted = true
  const saved = await author.save()
  return res.send(saved)
}
