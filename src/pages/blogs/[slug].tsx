import {
  Box,
  Group,
  Image,
  Loader,
  Paper,
  SimpleGrid,
  Title,
} from '@mantine/core'
import Head from 'next/head'
import { FC, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import Author from 'components/author'
import Comments from 'components/comments'
import Categories from 'components/categories'
import RelatedPosts from 'components/relatedPosts'
import ShowRender from 'components/post/showRender'
import { instance } from 'components/helpers/instance'
import PageWrapper from 'components/globals/pageWrapper'
import { ICategory, IRelatedPosts } from 'components/helpers/types'
import { useStyles } from 'components/styles/home'
const CreateComment = dynamic(() => import('components/createComment'), {
  ssr: false,
})

export interface IPost {
  bannerImageUrl: string
  categories: ICategory[]
  keywords: string
  data: any
  comments: any[]
  _id?: string
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

const Post: FC<IProps> = ({ postDetail, relatedPosts }) => {
  const router = useRouter()
  const { classes } = useStyles()

  useEffect(() => {
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

  return (
    <PageWrapper>
      <Head>
        <title>{`${postDetail.title} | Cubicle`}</title>
        <meta name="description" content={postDetail.excerpt} />
        <meta name="keywords" content={postDetail.keywords} />
        <meta name="og:title" content={`${postDetail.title} | Cubicle`} />
        <meta name="og:description" content={postDetail.excerpt} />
        <meta
          name="og:url"
          content={`https://cubicle.vercel.app/blogs/${postDetail.slug}`}
        />
        <meta name="twitter:title" content={`${postDetail.title} | Cubicle`} />
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
          <Author />
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
  try {
    const res = await instance.post('/post/details', { slug: params.slug })
    return {
      props: {
        postDetail: res.data.postDetail,
        relatedPosts: res.data.relatedPosts,
      },
      revalidate: 100,
    }
  } catch (err) {
    // console.log(err)
    return { props: {}, revalidate: 100 }
  }
}

export async function getStaticPaths() {
  try {
    const res = await instance.post('/post/card', {})
    const posts = res.data
    return {
      paths:
        posts.length > 0
          ? posts.map(({ slug }: { slug: string }) => ({ params: { slug } }))
          : [],
      fallback: true,
    }
  } catch (err) {
    // console.log(err)
    return { paths: [], fallback: true }
  }
}
