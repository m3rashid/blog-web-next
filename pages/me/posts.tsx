import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Table, Anchor, ScrollArea, Button } from '@mantine/core'

import { instance } from 'components/helpers/instance'
import PageWrapper from 'components/globals/pageWrapper'

interface IProps {}

const MyPosts: React.FC<IProps> = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [posts, setPosts] = React.useState<any[]>([])

  const getAuthorPosts = async () => {
    const res = await instance.post('/post/author', {})
    if (!res) return
    setPosts(res.data)
  }

  React.useEffect(() => {
    if (!session) {
      router.replace('/auth')
      return
    }
    getAuthorPosts().then().catch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  return (
    <PageWrapper>
      <Head>
        <title>My Posts</title>
        <meta
          name="description"
          content="Cubicle is a blog website which mainly focuses on the life of programmers in general. Also, includes programming tips, tricks and tutorials"
        />
        <meta name="image" content="https://cubicle.vercel.app/favicon.png" />
      </Head>
      <ScrollArea>
        <Table sx={{ minWidth: 800 }} verticalSpacing="md" highlightOnHover>
          <thead>
            <tr>
              <th>#</th>
              <th>Post Title</th>
              <th>State</th>
              <th>Categories</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((row, index) => {
              return (
                <tr key={row._id}>
                  <td>{index + 1}</td>
                  <td>
                    <Anchor component={Link} href={`/blogs/${row.slug}`}>
                      {row.title}
                    </Anchor>
                  </td>
                  <td>{row.published ? 'Published' : 'Draft'}</td>
                  <td style={{ maxWidth: '300px' }}>
                    {row.categories.map((cat: any, i: number) => (
                      <span key={`${cat.slug}-${i}-${index}`}>
                        {cat.name}, &nbsp;
                      </span>
                    ))}
                  </td>
                  <td>
                    <Button
                      onClick={() => router.push(`/blogs/edit/${row.slug}`)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </ScrollArea>
    </PageWrapper>
  )
}

export default MyPosts
