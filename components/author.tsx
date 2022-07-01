import React from 'react'
import { Avatar, Box, Group, Paper, Text, Title } from '@mantine/core'

import { IAuthor } from 'components/helpers/types'
import { AuthorSocials } from 'pages/author/[slug]'

interface IProps {
  author: IAuthor
}

const Author: React.FC<IProps> = ({ author }) => {
  return (
    <Paper shadow="xs" radius="md" p={20}>
      <Group>
        <Avatar size="xl" radius={100} src={author.avatar} mb={4} />
        <Box>
          <Title sx={(theme) => ({ fontFamily: theme.fontFamily })} order={3}>
            {author.name}
          </Title>
          <Text style={{ fontWeight: 700 }}>@{author.slug}</Text>
        </Box>
      </Group>
      <AuthorSocials authorDetails={author} />
    </Paper>
  )
}

export default Author
