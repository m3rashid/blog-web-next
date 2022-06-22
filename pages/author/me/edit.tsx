import {
  Button,
  createStyles,
  Group,
  Loader,
  Paper,
  SimpleGrid,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import {
  BrandFacebook,
  BrandGithub,
  BrandInstagram,
  BrandLinkedin,
  BrandTwitter,
  BrandYoutube,
  World,
} from 'tabler-icons-react'
import { useSafeApiCall } from '../../../components/api/safeApiCall'
import { authAtom } from '../atoms/auth'
import PageWrapper from '../../../components/globals/pageWrapper'
import { SingleSectionRender } from '../../../components/post/showRender'
import { IAuthor } from '../types'

const useStyles = createStyles((theme) => ({
  input: {
    flexGrow: 1,
    fontFamily: theme.fontFamily,
    input: {},
  },
}))

interface IProps {}

const EditAuthorProfile: React.FC<IProps> = () => {
  const navigate = useNavigate()
  const auth = useRecoilValue(authAtom)
  const { safeApiCall, loading } = useSafeApiCall()
  const [authorDetails, setAuthorDetails] = React.useState<IAuthor>({
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
  })

  const handleGetAuthor = async () => {
    const res = await safeApiCall({
      body: { slug: auth.user.author?.slug },
      endpoint: '/author/get-details',
      notif: { id: 'get-author-details' },
    })

    if (!res) {
      return
    }
    setAuthorDetails(res.data)
  }

  React.useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/auth', { replace: true })
      return
    }

    handleGetAuthor().then().catch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.isAuthenticated])

  const { classes } = useStyles()

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setAuthorDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleEditAuthor = async () => {
    const res = await safeApiCall({
      endpoint: '/author/edit',
      body: { ...authorDetails },
      notif: { id: 'edit-author-details-page', show: true },
    })

    if (!res) return
  }

  if (!authorDetails) {
    return (
      <PageWrapper>
        <Loader />
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <Paper withBorder shadow="xs" p={30} mt={30} radius="md">
        <Title
          align="center"
          className={classes.input}
          style={{ marginBottom: '30px' }}
        >
          Edit Author Profile
        </Title>
        <SimpleGrid>
          <Textarea
            name="bio"
            label="Describe yourself"
            minRows={5}
            value={authorDetails.bio}
            required
            className={classes.input}
            onChange={handleChange}
            placeholder="Enter your bio (introduction)"
          />
          <SingleSectionRender data={authorDetails.bio} />

          <Group>
            <TextInput
              name="avatar"
              label="Enter your avatar URL"
              value={authorDetails.avatar}
              required
              icon={<World />}
              className={classes.input}
              onChange={handleChange}
              placeholder="Enter avatar URL"
            />
            <TextInput
              name="website"
              label="Enter your website URL"
              value={authorDetails.website}
              icon={<World />}
              className={classes.input}
              onChange={handleChange}
              placeholder="Enter your personal portfolio website URL"
            />
          </Group>
          <TextInput
            name="linkedinUrl"
            label="Enter your linkedin username"
            value={authorDetails.linkedinUrl}
            icon={<BrandLinkedin />}
            className={classes.input}
            onChange={handleChange}
            placeholder="Enter linkedin username"
          />
          <Group>
            <TextInput
              name="githubUrl"
              label="Enter your github username"
              value={authorDetails.githubUrl}
              icon={<BrandGithub />}
              className={classes.input}
              onChange={handleChange}
              placeholder="Enter your github username"
            />
            <TextInput
              name="twitterUrl"
              label="Enter your twitter username"
              value={authorDetails.twitterUrl}
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
              value={authorDetails.facebookUrl}
              icon={<BrandFacebook />}
              className={classes.input}
              onChange={handleChange}
              placeholder="Enter facebook profile URL"
            />
            <TextInput
              name="instagramUrl"
              label="Enter your instagram username"
              value={authorDetails.instagramUrl}
              icon={<BrandInstagram />}
              className={classes.input}
              onChange={handleChange}
              placeholder="Enter instagram username"
            />
          </Group>
          <TextInput
            name="youtubeUrl"
            label="Enter your youtube channel URL"
            value={authorDetails.youtubeUrl}
            icon={<BrandYoutube />}
            className={classes.input}
            onChange={handleChange}
            placeholder="Enter youtube channel URL"
          />
        </SimpleGrid>
        <Group style={{ marginTop: '15px', justifyContent: 'flex-end' }}>
          <Button onClick={handleEditAuthor} loading={loading}>
            Save Author Profile
          </Button>
        </Group>
      </Paper>
    </PageWrapper>
  )
}

export default EditAuthorProfile
