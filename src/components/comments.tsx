import dayjs from 'dayjs'
import { FC } from 'react'
import { Avatar, Box, Group, Paper, Stack, Text, Title } from '@mantine/core'

import { SingleSectionRender } from 'components/post/showRender'

interface IProps {
  comments: any[]
}

const Comments: FC<IProps> = ({ comments }) => {
  return (
    <>
      <Paper
        style={{ width: '100%', height: 'min-content' }}
        shadow="xs"
        p="md"
        radius="md"
      >
        <Title order={3} sx={(theme) => ({ fontFamily: theme.fontFamily })}>
          Comments
        </Title>
      </Paper>

      <Stack spacing={4} mt={2}>
        {comments.length === 0 ? (
          <Paper
            style={{ width: '100%', height: 'min-content' }}
            shadow="xs"
            p="md"
            radius="md"
          >
            <Text>No comments yet</Text>
          </Paper>
        ) : (
          comments.map((comment) => {
            return (
              <Paper
                style={{ width: '100%', height: 'min-content' }}
                shadow="xs"
                p="md"
                radius="md"
                mb={15}
                key={comment._id}
              >
                <Group style={{ marginBottom: '10px' }}>
                  <Avatar size={60} radius={30} />
                  <Box>
                    <Text style={{ fontWeight: 600 }}>{comment.name}</Text>
                    <Text>
                      {dayjs(comment.createdAt).format('dddd, DD MMMM YYYY')}
                    </Text>
                  </Box>
                </Group>
                <SingleSectionRender data={comment.comment} />
              </Paper>
            )
          })
        )}
      </Stack>
    </>
  )
}

export default Comments
