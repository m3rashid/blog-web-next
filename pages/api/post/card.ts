export const getPostsForCard = async (req: Request, res: Response) => {
  const posts = await Post.aggregate([
    { $limit: 6 },
    {
      $lookup: {
        from: 'categories',
        localField: 'categories',
        foreignField: '_id',
        as: 'categories',
      },
    },
    {
      $project: {
        title: 1,
        slug: 1,
        bannerImageUrl: 1,
        categories: { name: 1, slug: 1 },
      },
    },
  ])
  res.status(200).json(posts)
}
