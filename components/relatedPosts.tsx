import React from 'react'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { createStyles, Group, Image, Paper, Text, Title } from '@mantine/core'

import { IRelatedPosts } from './helpers/types'

interface IProps {
  relatedPosts: IRelatedPosts[]
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

const RelatedPosts: React.FC<IProps> = ({ relatedPosts }) => {
  const router = useRouter()

  const { classes } = useStyles()

  return (
    <Paper shadow="xs" radius="md" p={20}>
      <Title
        sx={(theme) => ({ fontFamily: theme.fontFamily, marginBottom: '10px' })}
        order={3}
      >
        Related Posts
      </Title>
      {relatedPosts.map((post) => (
        <Group
          noWrap
          spacing={0}
          key={post._id}
          onClick={() => router.push(`/post/${post.slug}`)}
          style={{ marginBottom: '10px', cursor: 'pointer' }}
        >
          <Image alt="" src={post.bannerImageUrl} height={80} width={80} />
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
