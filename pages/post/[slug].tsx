import {
  Box,
  createStyles,
  Group,
  Image,
  Loader,
  Paper,
  SimpleGrid,
  Title,
} from '@mantine/core'
import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { useStyles } from '..'
import Author from '../../components/author'
import Comments from '../../components/comments'
import Categories from '../../components/categories'
import RelatedPosts from '../../components/relatedPosts'
import PageWrapper from '../../components/globals/pageWrapper'
import { instance } from '../../components/helpers/instance'
import {
  IAuthor,
  ICategory,
  IRelatedPosts,
} from '../../components/helpers/types'
const CreateComment = dynamic(() => import('../../components/createComment'), {
  ssr: false,
})
import ShowRender from '../../components/post/showRender'

export interface IPost {
  bannerImageUrl: string
  categories: ICategory[]
  data: any
  comments: any[]
  _id?: string
  author: IAuthor | string
  slug: string
  title: string
  excerpt: string
  createdAt?: string
  updatedAt?: string
}

interface IProps {
  postDetail: IPost
  relatedPosts: IRelatedPosts[]
}

const Post: React.FC<IProps> = ({ postDetail, relatedPosts }) => {
  const router = useRouter()
  const { classes } = useStyles()

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

  if (!postDetail) {
    return (
      <PageWrapper>
        <Group style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Title className={classes.title} my={10} order={3}>
            Article not found
          </Title>
        </Group>
      </PageWrapper>
    )
  }

  const postTitle = postDetail.title || 'Post'
  const keywords = postTitle.split(' ')
  const result = keywords.filter((word: string) => word.length > 4)

  return (
    <PageWrapper>
      <Head>
        <title>{postTitle} | Cubicle</title>
        <meta name="description" content={postDetail.excerpt} />
        <meta name="keywords" content={result.join(', ')} />
        <meta name="og:title" content={postTitle + ' | Cubicle'} />
        <meta name="og:description" content={postDetail.excerpt} />
        <meta
          name="og:url"
          content={'https://cubicle.vercel.app/post/' + postDetail.slug}
        />
        <meta name="twitter:title" content={postTitle + ' | Cubicle'} />
        <meta name="twitter:description" content={postDetail.excerpt} />

        <meta name="image" content={postDetail.bannerImageUrl} />
        <meta name="og:image" content={postDetail.bannerImageUrl} />
        <meta name="twitter:image" content={postDetail.bannerImageUrl} />
      </Head>
      <Box className={classes.titleBox}>
        <Title className={classes.title} my={10}>
          {postDetail.title}
        </Title>
      </Box>

      <Group style={{ alignItems: 'flex-start' }}>
        <SimpleGrid spacing={20} className={classes.firstChild}>
          <Paper shadow="xs" radius="md">
            <Image alt="" src={postDetail.bannerImageUrl} radius="md" />
            <Box p="xs">
              <ShowRender data={postDetail.data} />
            </Box>
          </Paper>
          <Comments comments={postDetail.comments} />
        </SimpleGrid>

        <SimpleGrid spacing={20} className={classes.secondChild}>
          <Author author={postDetail.author as IAuthor} />
          <RelatedPosts relatedPosts={relatedPosts} />
          <Categories />
          <CreateComment postId={postDetail._id as string} />
        </SimpleGrid>
      </Group>
    </PageWrapper>
  )
}

export default Post

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const res = await instance.post('/post/details', { slug: params.slug })
  return {
    props: {
      postDetail: res.data.postDetail,
      relatedPosts: res.data.relatedPosts,
    },
    revalidate: 100,
  }
}

export async function getStaticPaths() {
  const res = await instance.post('/post/card')
  const posts = res.data
  return {
    paths: posts.map(({ slug }: { slug: string }) => ({ params: { slug } })),
    fallback: true,
  }
}
