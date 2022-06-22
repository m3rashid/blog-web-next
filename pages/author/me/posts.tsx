import React from 'react'
import { useRecoilValue } from 'recoil'
import { Link, useNavigate } from 'react-router-dom'
import { Table, Anchor, ScrollArea, Button } from '@mantine/core'

import { authAtom } from '../atoms/auth'
import { useSafeApiCall } from '../../../components/api/safeApiCall'
import PageWrapper from '../../../components/globals/pageWrapper'

interface IProps {}

const MyPosts: React.FC<IProps> = () => {
  const auth = useRecoilValue(authAtom)
  const navigate = useNavigate()
  const [posts, setPosts] = React.useState<any[]>([])
  const { safeApiCall } = useSafeApiCall()

  const getAuthorPosts = async () => {
    const res = await safeApiCall({
      body: { authorId: auth.user.profile },
      endpoint: '/post/author',
      notif: { id: 'get-author-posts' },
    })

    if (!res) return
    setPosts(res.data)
  }

  React.useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/auth', { replace: true })
      return
    }
    getAuthorPosts().then().catch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.isAuthenticated])

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
                    <Anchor component={Link} to={`/post/${row.slug}`}>
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
                    <Button onClick={() => navigate(`/post/edit/${row.slug}`)}>
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
