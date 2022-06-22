import { createStyles, Group, Image, Paper, Text, Title } from '@mantine/core'
import dayjs from 'dayjs'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSafeApiCall } from '../api/safeApiCall'

interface IProps {
  slug: string
}

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  body: {
    padding: theme.spacing.md,
  },
}))

const RelatedPosts: React.FC<IProps> = ({ slug }) => {
  const { safeApiCall } = useSafeApiCall()
  const navigate = useNavigate()
  const [data, setData] = React.useState<any[]>([])

  const getRelatedPosts = async () => {
    const res = await safeApiCall({
      endpoint: '/post/related',
      body: { slug },
      notif: { id: 'related-posts', show: false },
    })
    if (!res) return
    setData(res.data)
  }

  React.useEffect(() => {
    getRelatedPosts().then().catch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { classes } = useStyles()

  return (
    <Paper shadow="xs" radius="md" p={20}>
      <Title
        sx={(theme) => ({ fontFamily: theme.fontFamily, marginBottom: '10px' })}
        order={3}
      >
        Related Posts
      </Title>
      {data.map((post) => (
        <Group
          noWrap
          spacing={0}
          key={post._id}
          onClick={() => navigate(`/post/${post.slug}`)}
          style={{ marginBottom: '10px', cursor: 'pointer' }}
        >
          <Image src={post.bannerImageUrl} height={80} width={80} />
          <div className={classes.body}>
            <Text className={classes.title} mt="xs" mb="md">
              {post.title}
            </Text>
            <Text size="xs" color="dimmed">
              {dayjs(post.createdAt).format('dddd, DD MMMM YYYY')}
            </Text>
          </div>
        </Group>
      ))}
    </Paper>
  )
}

export default RelatedPosts
