export const getRelatedPosts = async (req: Request, res: Response) => {
  const { slug } = req.body

  const posts = await Post.aggregate([
    // @ts-ignore
    { $match: { slug: slug, published: true } },
    {
      $lookup: {
        from: 'categories',
        localField: 'categories',
        foreignField: '_id',
        as: 'category',
      },
    },
    {
      $project: {
        _id: 0,
        category: { name: 1, slug: 1, _id: 1 },
      },
    },
    { $unwind: { path: '$category', preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: 'posts',
        localField: 'category._id',
        foreignField: 'categories',
        as: 'posts',
      },
    },
    {
      $project: {
        posts: { _id: 1, title: 1, slug: 1, bannerImageUrl: 1, createdAt: 1 },
      },
    },
    {
      $unwind: { path: '$posts', preserveNullAndEmptyArrays: true },
    },
    { $match: { 'posts.slug': { $ne: slug } } },
    {
      $project: {
        _id: '$posts._id',
        title: '$posts.title',
        slug: '$posts.slug',
        bannerImageUrl: '$posts.bannerImageUrl',
        createdAt: '$posts.createdAt',
      },
    },
    {
      $group: {
        _id: {
          _id: '$_id',
          slug: '$slug',
          title: '$title',
          bannerImageUrl: '$bannerImageUrl',
          createdAt: '$createdAt',
        },
      },
    },
    { $limit: 5 },
    {
      $project: {
        _id: '$_id._id',
        title: '$_id.title',
        slug: '$_id.slug',
        bannerImageUrl: '$_id.bannerImageUrl',
        createdAt: '$_id.createdAt',
      },
    },
  ])

  return res.status(200).json(posts)
}
