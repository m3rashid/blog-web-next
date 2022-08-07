import { Category } from 'server/models/category'
import { createRouter } from 'server/createRouter'

export const categoryRouter = createRouter().query('getCategories', {
  async resolve() {
    const categories = await Category.aggregate([
      { $project: { createdAt: 0, updatedAt: 0, __v: 0 } },
    ])
    return categories
  },
})
