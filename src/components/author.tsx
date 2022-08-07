import {
  BrandGithub,
  BrandInstagram,
  BrandLinkedin,
  BrandTwitter,
  BrandYoutube,
  World,
} from 'tabler-icons-react'
import { FC } from 'react'
import { Anchor, Avatar, Box, Group, Paper, Title } from '@mantine/core'

import { authorDetails } from 'components/data/userDetail'

interface IProps {}

const Author: FC<IProps> = () => {
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
        <Anchor<'a'> href={authorDetails.website} target="_blank">
          <World />
        </Anchor>
        <Anchor<'a'> href={authorDetails.linkedIn} target="_blank">
          <BrandLinkedin />
        </Anchor>
        <Anchor<'a'> href={authorDetails.github} target="_blank">
          <BrandGithub />
        </Anchor>
        <Anchor<'a'> href={authorDetails.twitter} target="_blank">
          <BrandTwitter />
        </Anchor>
        <Anchor<'a'> href={authorDetails.youtube} target="_blank">
          <BrandYoutube />
        </Anchor>
        <Anchor<'a'> href={authorDetails.instagram} target="_blank">
          <BrandInstagram />
        </Anchor>
      </Group>
    </Paper>
  )
}

export default Author
