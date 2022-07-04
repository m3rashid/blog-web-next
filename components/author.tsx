import {
  BrandGithub,
  BrandInstagram,
  BrandLinkedin,
  BrandTwitter,
  BrandYoutube,
  World,
} from 'tabler-icons-react'
import React from 'react'
import { Anchor, Avatar, Box, Group, Paper, Title } from '@mantine/core'

import { authorDetails } from 'components/userDetail'

interface IProps {}

const Author: React.FC<IProps> = () => {
  return (
    <Paper shadow="xs" radius="md" p={20}>
      <Group>
        <Avatar size="xl" radius={100} src={authorDetails.avatar} mb={4} />
        <Box>
          <Title sx={(theme) => ({ fontFamily: theme.fontFamily })} order={3}>
            {authorDetails.name}
          </Title>
        </Box>
      </Group>
      <Group style={{ marginTop: '20px' }}>
        {authorDetails.website && (
          <Anchor<'a'> href={authorDetails.website} target="_blank">
            <World />
          </Anchor>
        )}
        {authorDetails.linkedIn && (
          <Anchor<'a'>
            href={`https://linkedin.com/in/${authorDetails.linkedIn}`}
            target="_blank"
          >
            <BrandLinkedin />
          </Anchor>
        )}
        {authorDetails.github && (
          <Anchor<'a'>
            href={`https://github.com/${authorDetails.github}`}
            target="_blank"
          >
            <BrandGithub />
          </Anchor>
        )}
        {authorDetails.twitter && (
          <Anchor<'a'>
            href={`https://twitter.com/${authorDetails.twitter}`}
            target="_blank"
          >
            <BrandTwitter />
          </Anchor>
        )}
        {authorDetails.youtube && (
          <Anchor<'a'> href={authorDetails.youtube} target="_blank">
            <BrandYoutube />
          </Anchor>
        )}
        {authorDetails.instagram && (
          <Anchor<'a'>
            href={`https://instagram.com/${authorDetails.instagram}`}
            target="_blank"
          >
            <BrandInstagram />
          </Anchor>
        )}
      </Group>
    </Paper>
  )
}

export default Author
