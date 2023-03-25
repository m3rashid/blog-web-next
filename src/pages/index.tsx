import axios from 'axios';
import { FC } from 'react';
import Head from 'next/head';
import { Box, Group, SimpleGrid } from '@mantine/core';

import Hero from 'components/hero';
import Categories from 'components/categories';
import PostCard from 'components/post/postcard';
import PageWrapper from 'components/globals/pageWrapper';
import { IPostCardForCard } from 'components/helpers/types';
import { useHomePageStyles, useStyles } from 'components/styles/home';

interface IProps {
  posts: IPostCardForCard[];
}

const Blogs: FC<IProps> = ({ posts }) => {
  const { classes } = useStyles();
  const { classes: thisPageClasses } = useHomePageStyles();

  return (
    <PageWrapper>
      <Head>
        <title>Blogs</title>
        <meta
          name='description'
          content='Cubicle is a blog website which mainly focuses on the life of programmers in general. Also, includes programming tips, tricks and tutorials'
        />
        <meta
          name='keywords'
          content='cubicle, programming, coding, life, web development, coder, programmer, new skills, latest, technology, computer, science, nerdy, nerd'
        />

        <meta name='og:title' content='Home | Cubicle' />
        <meta name='og:url' content='https://cubicle.vercel.app/' />
        <meta
          name='og:description'
          content='Cubicle is a blog website which mainly focuses on the life of programmers in general. Also, includes programming tips, tricks and tutorials'
        />

        <meta name='twitter:title' content='Home | Cubicle' />
        <meta
          name='twitter:description'
          content='Cubicle is a blog website which mainly focuses on the life of programmers in general. Also, includes programming tips, tricks and tutorials'
        />

        <link rel='apple-touch-icon' href='/favicon.png' type='image/x-icon' />
        <link rel='shortcut icon' href='/favicon.png' type='image/x-icon' />
        <meta name='image' content='https://cubicle.vercel.app/favicon.png' />
        <meta
          name='og:image'
          content='https://cubicle.vercel.app/favicon.png'
        />
        <meta
          name='twitter:image'
          content='https://cubicle.vercel.app/favicon.png'
        />
      </Head>
      <Box style={{ padding: '10px', marginBottom: '20px' }}>
        <Hero />
      </Box>

      <Group style={{ alignItems: 'flex-start' }}>
        <SimpleGrid spacing={20} className={classes.firstChild}>
          <SimpleGrid className={thisPageClasses.inner} spacing={20}>
            {posts && posts.length > 0
              ? posts.map((post) => (
                  <PostCard
                    key={post.slug}
                    categories={post.categories.map((c) => ({
                      name: c.name,
                      slug: c.slug + post.slug,
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
  );
};

export default Blogs;

export async function getStaticProps() {
  try {
    const result = await fetch('/api/posts', { method: 'GET' });
    const res = result.json();
    console.log({ res });
    return {
      props: {
        posts: [],
      },
      revalidate: 100,
    };
    return {
      props: {
        posts: [],
      },
    };
  } catch (err) {
    return { props: {}, revalidate: 100 };
  }
}
