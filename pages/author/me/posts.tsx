import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Table, Anchor, ScrollArea, Button } from '@mantine/core'

import PageWrapper from 'components/globals/pageWrapper'

interface IProps {}

const MyPosts: React.FC<IProps> = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [posts, setPosts] = React.useState<any[]>([])
  // const { safeApiCall } = useSafeApiCall()

  // const getAuthorPosts = async () => {
  //   const res = await safeApiCall({
  //     body: { authorId: auth.user.profile },
  //     endpoint: '/post/author',
  //     notif: { id: 'get-author-posts' },
  //   })

  //   if (!res) return
  //   setPosts(res.data)
  // }

  React.useEffect(() => {
    if (!session) {
      router.replace('/auth')
      return
    }
    // getAuthorPosts().then().catch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  return (
    <PageWrapper>
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
                    <Anchor component={Link} href={`/post/${row.slug}`}>
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
                      onClick={() => router.push(`/post/edit/${row.slug}`)}
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
