import React from 'react'
import Head from 'next/head'
import { Box, Group, SimpleGrid } from '@mantine/core'

import Hero from 'components/hero'
import Categories from 'components/categories'
import PostCard from 'components/post/postcard'
import { instance } from 'components/helpers/instance'
import PageWrapper from 'components/globals/pageWrapper'
import { IPostCardForCard } from 'components/helpers/types'
import { useHomePageStyles, useStyles } from 'components/styles/home'
import { trpc } from 'utils/trpc'

interface IProps {
  posts: IPostCardForCard[]
}

const Blogs: React.FC<IProps> = ({ posts }) => {
  const { classes } = useStyles()
  const { classes: thisPageClasses } = useHomePageStyles()

  if (!posts) return null

  return (
    <PageWrapper>
      <Head>
        <title>Blogs</title>
        <meta
          name="description"
          content="Cubicle is a blog website which mainly focuses on the life of programmers in general. Also, includes programming tips, tricks and tutorials"
        />
        <meta
          name="keywords"
          content="cubicle, programming, coding, life, web development, coder, programmer, new skills, latest, technology, computer, science, nerdy, nerd"
        />

        <meta name="og:title" content="Home | Cubicle" />
        <meta name="og:url" content="https://cubicle.vercel.app/" />
        <meta
          name="og:description"
          content="Cubicle is a blog website which mainly focuses on the life of programmers in general. Also, includes programming tips, tricks and tutorials"
        />

        <meta name="twitter:title" content="Home | Cubicle" />
        <meta
          name="twitter:description"
          content="Cubicle is a blog website which mainly focuses on the life of programmers in general. Also, includes programming tips, tricks and tutorials"
        />

        <link rel="apple-touch-icon" href="/favicon.png" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
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
      <Box style={{ padding: '10px', marginBottom: '20px' }}>
        <Hero />
      </Box>

      <Group style={{ alignItems: 'flex-start' }}>
        <SimpleGrid spacing={20} className={classes.firstChild}>
          <SimpleGrid className={thisPageClasses.inner} spacing={20}>
            {posts.length > 0
              ? posts.map((post) => (
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
                ))
              : null}
          </SimpleGrid>
        </SimpleGrid>
        <SimpleGrid spacing={20} className={classes.secondChild}>
          <Categories />
        </SimpleGrid>
      </Group>
    </PageWrapper>
  )
}

export default Blogs

export async function getStaticProps() {
  try {
    const res = await instance.post('/post/card')
    return { props: { posts: res.data || [] }, revalidate: 100 }
  } catch (err) {
    console.log(err)
    return { props: {}, revalidate: 100 }
  }
}
