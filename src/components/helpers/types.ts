export interface ICategory {
  name: string;
  slug: string;
}

export interface IPostCardForCard {
  title: string;
  slug: string;
  bannerImageUrl: string;
  categories: ICategory[];
}
