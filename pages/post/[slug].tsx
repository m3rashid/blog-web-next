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
import Head from 'next/head'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useSafeApiCall } from '../../components/api/safeApiCall'

import Author from '../../components/author'
import Categories from '../../components/categories'
import Comments from '../../components/comments'
import PageWrapper from '../../components/globals/pageWrapper'
import ShowRender from '../../components/post/showRender'
import RelatedPosts from '../../components/relatedPosts'
import { IAuthor, ICategory } from '../types'
const CreateComment = React.lazy(() => import('../../components/createComment'))

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

export const useStyles = createStyles((theme) => ({
  firstChild: {
    width: '64%',
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },
  secondChild: {
    width: '33%',
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },
  title: {
    fontFamily: theme.fontFamily,
    fontSize: 50,
    wordBreak: 'break-all',
    whiteSpace: 'break-spaces',
    [theme.fn.smallerThan('sm')]: {
      fontSize: 25,
    },
  },
  titleBox: {
    width: '64%',
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },
  lowerGrid: {
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },
}))

interface IProps {}

const Post: React.FC<IProps> = () => {
  const { slug } = useParams()
  const { safeApiCall } = useSafeApiCall()
  const { classes } = useStyles()
  const [postDetail, setPostDetail] = React.useState<IPost>()

  const getPost = async () => {
    const res = await safeApiCall({
      endpoint: '/post/details',
      body: { slug },
      notif: { id: 'get-post' },
    })
    if (!res) return
    setPostDetail(res.data)
  }

  React.useEffect(() => {
    window.scrollTo(0, 0)
    getPost().then().catch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  if (!postDetail) {
    return (
      <PageWrapper>
        <Group style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Loader />
        </Group>
      </PageWrapper>
    )
  }

  const postTitle = post.title || 'Post'
  const keywords = postTitle.split(' ')
  const result = keywords.filter((word: string) => word.length > 4)

  return (
    <PageWrapper>
      <Head>
        <title>{postTitle} | Cubicle</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={result.join(', ')} />
        <meta name="og:title" content={postTitle + ' | Cubicle'} />
        <meta name="og:description" content={post.excerpt} />
        <meta
          name="og:url"
          content={'https://cubicle.vercel.app/post/' + post.slug}
        />
        <meta name="twitter:title" content={postTitle + ' | Cubicle'} />
        <meta name="twitter:description" content={post.excerpt} />

        <meta name="image" content={post.featuredImage} />
        <meta name="og:image" content={post.featuredImage} />
        <meta name="twitter:image" content={post.featuredImage} />
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
          <RelatedPosts slug={slug as string} />
          <Categories />
          <CreateComment postId={postDetail._id as string} />
        </SimpleGrid>
      </Group>
    </PageWrapper>
  )
}

export default Post
