import {
  Button,
  createStyles,
  Group,
  Paper,
  SimpleGrid,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core'
import React from 'react'
import {
  BrandFacebook,
  BrandGithub,
  BrandInstagram,
  BrandLinkedin,
  BrandTwitter,
  BrandYoutube,
  User,
  Webhook,
  World,
} from 'tabler-icons-react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { showNotification } from '@mantine/notifications'

import useHttp from 'components/helpers/useHttp'
import { IAuthor } from 'components/helpers/types'
import PageWrapper from 'components/globals/pageWrapper'
import { SingleSectionRender } from 'components/post/showRender'

const useStyles = createStyles((theme) => ({
  input: {
    flexGrow: 1,
    fontFamily: theme.fontFamily,
    input: {},
  },
}))

interface IProps {}

const CreateEditProfile: React.FC<IProps> = () => {
  const { data: session } = useSession()
  const { classes } = useStyles()
  const router = useRouter()

  React.useEffect(() => {
    if (!session) {
      router.replace('/auth')
    }
    // @ts-ignore
    if (session?.user?.profile) {
      router.replace('/author/me/edit')
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  const initialState: IAuthor = React.useMemo(
    () => ({
      name: '',
      slug: '',
      bio: '',
      avatar: '',
      website: '',
      githubUrl: '',
      twitterUrl: '',
      facebookUrl: '',
      instagramUrl: '',
      linkedinUrl: '',
      youtubeUrl: '',
    }),
    []
  )

  const [authorData, setAuthorData] = React.useState<IAuthor>(initialState)
  const { loading, request } = useHttp('add-author')

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setAuthorData((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleAddAuthor = async () => {
    if (
      !authorData.name ||
      !authorData.slug ||
      !authorData.bio ||
      !authorData.avatar
    ) {
      showNotification({
        title: 'Error',
        message: 'Please fill the required fields',
      })
      return
    }
    const { data } = await request({
      endpoint: '/author/create',
      body: { ...authorData },
    })
    if (!data) return
    setAuthorData(initialState)
    // setAuth((prev) => ({ ...prev, user: data.author._id }))
  }

  return (
    <PageWrapper>
      <Paper withBorder shadow="xs" p={30} mt={30} radius="md">
        <Title
          align="center"
          className={classes.input}
          style={{ marginBottom: '30px' }}
        >
          Complete Author Profile
        </Title>
        <SimpleGrid>
          <Group>
            <TextInput
              name="name"
              label="Enter your name"
              value={authorData.name}
              required
              icon={<User />}
              className={classes.input}
              onChange={handleChange}
              placeholder="Enter your Name"
            />
            <TextInput
              name="slug"
              label="Enter your pen name (unique)"
              value={authorData.slug}
              required
              icon={<Webhook />}
              className={classes.input}
              onChange={handleChange}
              placeholder="Enter a slug for your profile"
            />
          </Group>
          <Textarea
            name="bio"
            label="Describe yourself"
            minRows={5}
            value={authorData.bio}
            required
            className={classes.input}
            onChange={handleChange}
            placeholder="Enter your bio (introduction)"
          />
          <SingleSectionRender data={authorData.bio} />
          <Group>
            <TextInput
              name="avatar"
              label="Enter your avatar URL"
              value={authorData.avatar}
              required
              icon={<World />}
              className={classes.input}
              onChange={handleChange}
              placeholder="Enter avatar URL"
            />
            <TextInput
              name="website"
              label="Enter your website URL"
              value={authorData.website}
              icon={<World />}
              className={classes.input}
              onChange={handleChange}
              placeholder="Enter your personal portfolio website URL"
            />
          </Group>
          <TextInput
            name="linkedinUrl"
            label="Enter your linkedin username"
            value={authorData.linkedinUrl}
            icon={<BrandLinkedin />}
            className={classes.input}
            onChange={handleChange}
            placeholder="Enter linkedin username"
          />
          <Group>
            <TextInput
              name="githubUrl"
              label="Enter your github username"
              value={authorData.githubUrl}
              icon={<BrandGithub />}
              className={classes.input}
              onChange={handleChange}
              placeholder="Enter your github username"
            />
            <TextInput
              name="twitterUrl"
              label="Enter your twitter username"
              value={authorData.twitterUrl}
              icon={<BrandTwitter />}
              className={classes.input}
              onChange={handleChange}
              placeholder="Enter Twitter username"
            />
          </Group>
          <Group>
            <TextInput
              name="facebookUrl"
              label="Enter your facebook profile URL"
              value={authorData.facebookUrl}
              icon={<BrandFacebook />}
              className={classes.input}
              onChange={handleChange}
              placeholder="Enter facebook profile URL"
            />
            <TextInput
              name="instagramUrl"
              label="Enter your instagram username"
              value={authorData.instagramUrl}
              icon={<BrandInstagram />}
              className={classes.input}
              onChange={handleChange}
              placeholder="Enter instagram username"
            />
          </Group>
          <TextInput
            name="youtubeUrl"
            label="Enter your youtube channel URL"
            value={authorData.youtubeUrl}
            icon={<BrandYoutube />}
            className={classes.input}
            onChange={handleChange}
            placeholder="Enter youtube channel URL"
          />
        </SimpleGrid>
        <Group style={{ marginTop: '15px', justifyContent: 'flex-end' }}>
          <Button onClick={handleAddAuthor} loading={loading}>
            Save Author Profile
          </Button>
        </Group>
      </Paper>
    </PageWrapper>
  )
}

export default CreateEditProfile
