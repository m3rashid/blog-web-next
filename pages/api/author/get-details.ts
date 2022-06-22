import { Author } from '../../../models/author'

export const getAuthorDetails = async (req: Request, res: Response) => {
  const { slug } = req.body
  const author = await Author.findOne({ slug })

  return res.status(200).json(author)
}
