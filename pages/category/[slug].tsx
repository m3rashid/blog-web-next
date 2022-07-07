import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Group, Loader, SimpleGrid, Title } from '@mantine/core'

import PostCard from 'components/post/postcard'
import { useStyles } from 'components/styles/home'
import { instance } from 'components/helpers/instance'
import PageWrapper from 'components/globals/pageWrapper'
import { IPostCardForCard } from 'components/helpers/types'
import { useCategoryStyles } from 'components/styles/categories'

interface IProps {
  posts: IPostCardForCard[]
}

const Category: React.FC<IProps> = ({ posts }) => {
  const router = useRouter()

  const { classes } = useStyles()
  const { classes: thisPageClasses } = useCategoryStyles()

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [router.query.slug])

  if (router.isFallback) {
    return (
      <PageWrapper>
        <Group style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Loader />
        </Group>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <Head>
        <title>Cubicle</title>
        <meta
          name="description"
          content="Cubicle is a blog website which mainly focuses on the life of programmers in general. Also, includes programming tips, tricks and tutorials"
        />
        <meta name="og:title" content="Cubicle" />
        <meta
          name="og:url"
          content={'https://cubicle.vercel.app/category/' + router.query.slug}
        />
        <meta
          name="og:description"
          content="Cubicle is a blog website which mainly focuses on the life of programmers in general. Also, includes programming tips, tricks and tutorials"
        />
        <meta name="twitter:title" content="Cubicle" />
        <meta
          name="twitter:description"
          content="Cubicle is a blog website which mainly focuses on the life of programmers in general. Also, includes programming tips, tricks and tutorials"
        />
        <meta name="image" content="https://cubicle.vercel.app/favicon.png" />
        <meta
          name="og:image"
          content="https://cubicle.vercel.app/favicon.png"
        />
        <meta
          name="twitter:image"
          content="https://cubicle.vercel.app/favicon.png"
        />
      </Head>
      {!posts || posts.length == 0 ? (
        <Group style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Title className={classes.title} my={10} order={3}>
            No articles found
          </Title>
        </Group>
      ) : (
        <SimpleGrid className={thisPageClasses.inner} spacing={20}>
          {posts.map((post) => (
            <PostCard
              key={post._id}
              categories={post.categories.map((c) => ({
                name: c.name,
                _id: c._id + post._id,
              }))}
              image={post.bannerImageUrl}
              title={post.title}
              slug={post.slug}
            />
          ))}
        </SimpleGrid>
      )}
    </PageWrapper>
  )
}

export default Category

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const res = await instance.post('/post/by-category', { slug: params.slug })
  return {
    props: {
      posts: res.data,
    },
    revalidate: 20,
  }
}

export async function getStaticPaths() {
  const res = await instance.post('/category/all')
  const categories = res.data
  return {
    paths: categories.map(({ slug }: { slug: string }) => ({
      params: {
        slug,
      },
    })),
    fallback: true,
  }
}
