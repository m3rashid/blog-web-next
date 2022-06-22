import React from 'react'
import { Box, createStyles, Group, SimpleGrid } from '@mantine/core'
import Hero from '../components/hero'
import PageWrapper from '../components/globals/pageWrapper'
import { useRecoilValue } from 'recoil'
import { postsForCardAtom } from '../atoms/postCard'
import PostCard from '../components/post/postcard'
import Categories from '../components/categories'
import { useStyles } from './post'
import Head from 'next/head'

interface IProps {}

export const useHomePageStyles = createStyles((theme) => ({
  inner: {
    gridTemplateColumns: '1fr 1fr',
    [theme.fn.smallerThan('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
}))

const Home: React.FC<IProps> = () => {
  const posts = useRecoilValue(postsForCardAtom)
  const { classes } = useStyles()
  const { classes: thisPageClasses } = useHomePageStyles()

  return (
    <PageWrapper>
      <Head>
        <title>Home | Cubicle</title>
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
            {posts.map((post) => (
              <PostCard
                key={post._id}
                categories={post.categories.map((c) => c.name)}
                image={post.bannerImageUrl}
                title={post.title}
                slug={post.slug}
              />
            ))}
          </SimpleGrid>
        </SimpleGrid>
        <SimpleGrid spacing={20} className={classes.secondChild}>
          <Categories />
        </SimpleGrid>
      </Group>
    </PageWrapper>
  )
}

export default Home
