import React from 'react'
import dayjs from 'dayjs'
import {
  BrandFacebook,
  BrandGithub,
  BrandInstagram,
  BrandLinkedin,
  BrandTwitter,
  BrandYoutube,
  World,
} from 'tabler-icons-react'
import {
  Anchor,
  Avatar,
  Box,
  Group,
  Loader,
  Paper,
  Text,
  Title,
} from '@mantine/core'
import { useRouter } from 'next/router'

import { IAuthor } from 'components/helpers/types'
import PageWrapper from 'components/globals/pageWrapper'
import { SingleSectionRender } from 'components/post/showRender'

interface IProps {}

export const AuthorSocials: React.FC<{ authorDetails: IAuthor }> = ({
  authorDetails,
}) => {
  return (
    <Group style={{ marginTop: '20px' }}>
      {authorDetails.website && (
        <Anchor<'a'> href={authorDetails.website} target="_blank">
          <World />
        </Anchor>
      )}
      {authorDetails.linkedinUrl && (
        <Anchor<'a'>
          href={`https://linkedin.com/in/${authorDetails.linkedinUrl}`}
          target="_blank"
        >
          <BrandLinkedin />
        </Anchor>
      )}
      {authorDetails.githubUrl && (
        <Anchor<'a'>
          href={`https://github.com/${authorDetails.githubUrl}`}
          target="_blank"
        >
          <BrandGithub />
        </Anchor>
      )}
      {authorDetails.twitterUrl && (
        <Anchor<'a'>
          href={`https://twitter.com/${authorDetails.twitterUrl}`}
          target="_blank"
        >
          <BrandTwitter />
        </Anchor>
      )}
      {authorDetails.youtubeUrl && (
        <Anchor<'a'> href={authorDetails.youtubeUrl} target="_blank">
          <BrandYoutube />
        </Anchor>
      )}
      {authorDetails.instagramUrl && (
        <Anchor<'a'>
          href={`https://instagram.com/${authorDetails.instagramUrl}`}
          target="_blank"
        >
          <BrandInstagram />
        </Anchor>
      )}
      {authorDetails.facebookUrl && (
        <Anchor<'a'> href={authorDetails.facebookUrl} target="_blank">
          <BrandFacebook />
        </Anchor>
      )}
    </Group>
  )
}

const AuthorProfile: React.FC<IProps> = () => {
  const router = useRouter()
  const [authorDetails, setAuthorDetails] = React.useState<IAuthor>()

  // const handleGetAuthor = async () => {
  //   const res = await safeApiCall({
  //     body: { slug: router.query.slug },
  //     endpoint: '/author/get-details',
  //     notif: { id: 'get-author-details' },
  //   })

  //   if (!res) {
  //     return
  //   }
  //   setAuthorDetails(res.data)
  // }

  React.useEffect(() => {
    if (!router.query.slug || router.query.slug === 'undefined') {
      router.replace('/author/me/create')
      return
    }
    // handleGetAuthor().then().catch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!authorDetails) {
    return (
      <PageWrapper>
        <Loader />
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <Paper
        withBorder
        shadow="md"
        p={30}
        mt={30}
        radius="md"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Group
          style={{ gap: 30, marginBottom: '20px', justifyContent: 'center' }}
        >
          <Avatar src={authorDetails.avatar} size={200} radius={100} />
          <Box>
            <Title
              align="center"
              sx={(theme) => ({ fontFamily: theme.fontFamily })}
            >
              {authorDetails.name}
            </Title>
            <Text
              align="center"
              style={{ fontSize: '1.2rem', fontWeight: 600 }}
            >
              @{authorDetails.slug}
            </Text>
            <AuthorSocials authorDetails={authorDetails} />
            <Text style={{ marginTop: '15px' }}>
              Joined on : &nbsp;
              {dayjs(authorDetails.createdAt).format('dddd, DD MMMM YYYY')}
            </Text>
            <Text>
              Last Updated on: &nbsp;
              {dayjs(authorDetails.updatedAt).format('dddd, DD MMMM YYYY')}
            </Text>
          </Box>
        </Group>
        <SingleSectionRender data={authorDetails.bio} />
      </Paper>
    </PageWrapper>
  )
}

export default AuthorProfile

export async function getStaticProps() {}

export async function getStaticPaths() {}
