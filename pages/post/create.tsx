import {
  Box,
  Button,
  createStyles,
  Group,
  Paper,
  Switch,
  Title,
} from '@mantine/core'
import React from 'react'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { useSession } from 'next-auth/react'

import useHttp from 'components/helpers/useHttp'
import ShowRender from 'components/post/showRender'
import ChooseTypeButton from 'components/post/select'
import PageWrapper from 'components/globals/pageWrapper'
import { postAtom, PostType } from 'components/atoms/post'
import CreateOrEditPost from 'components/post/createOrEditPost'
import TitleSlug, { IPostMeta } from 'components/post/titleSlug'

export const useStyles = createStyles((theme) => ({
  buttonTop: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    flexDirection: 'row-reverse',
  },
  input: {
    flexGrow: 1,
  },
  switch: {
    display: 'flex',
    flexDirection: 'row-reverse',
    gap: '10px',
    padding: '0 10px',
  },
  switchInput: {
    fontSize: '0.7rem',
  },
  switchLabel: {
    padding: 0,
    fontWeight: 600,
  },
}))

interface IProps {}

const CreatePost: React.FC<IProps> = () => {
  const router = useRouter()
  const { classes } = useStyles()
  const { data: session } = useSession()
  const [data, setData] = useRecoilState(postAtom)
  const [publish, setPublish] = React.useState(true)
  const { loading, request } = useHttp('create-post')
  const [type, setType] = React.useState<PostType>('text')
  const postMetaInitialState: IPostMeta = React.useMemo(
    () => ({
      title: '',
      slug: '',
      bannerImageUrl: '',
      categories: [],
    }),
    []
  )

  React.useEffect(() => {
    if (!session) {
      router.replace('/auth')
      // @ts-ignore
    } else if (!session?.user?.profile) {
      router.replace('/author/me/create')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  const [postMeta, setPostMeta] =
    React.useState<IPostMeta>(postMetaInitialState)

  const saveAndPublish = async () => {
    const { data: saveRes } = await request({
      endpoint: '/post/create',
      body: {
        title: postMeta.title,
        slug: postMeta.slug,
        data: data,
        bannerImageUrl: postMeta.bannerImageUrl,
        // @ts-ignore
        authorId: session?.user?.profile,
        categories: postMeta.categories,
        published: publish,
      },
    })
    if (!saveRes) return
    setPostMeta(postMetaInitialState)
    setData([])
  }

  const handleAddSection = () => {
    setData((prev) => [...prev, { id: nanoid(), type: type, content: '' }])
  }

  return (
    <PageWrapper>
      <Box className={classes.buttonTop}>
        <Button onClick={saveAndPublish} loading={loading}>
          Save {publish ? ' and Publish' : ' as draft'}
        </Button>
        <Switch
          classNames={{
            root: classes.switch,
            input: classes.switchInput,
            label: classes.switchLabel,
          }}
          size="lg"
          checked={publish}
          onLabel="ON"
          offLabel="OFF"
          label="Publish"
          onChange={(e) => setPublish(e.currentTarget.checked)}
        />
      </Box>

      <TitleSlug postMeta={postMeta} setPostMeta={setPostMeta} />

      {data.map((section) => (
        <CreateOrEditPost key={section.id} id={section.id} />
      ))}

      <Paper
        shadow="xs"
        p="md"
        style={{ paddingTop: '40px', paddingBottom: '40px' }}
      >
        <Group style={{ alignItems: 'flex-end' }}>
          <ChooseTypeButton value={type} setValue={setType} labelType="new" />
          <Button onClick={handleAddSection}>Add Section</Button>
        </Group>
      </Paper>

      {data.length !== 0 && (
        <>
          <Box style={{ marginTop: '30px', marginBottom: '10px' }}>
            <Title sx={(theme) => ({ fontFamily: theme.fontFamily })}>
              Rendered Post
            </Title>
          </Box>

          <Paper
            shadow="xs"
            p="xs"
            style={{ paddingTop: '40px', paddingBottom: '40px' }}
          >
            <ShowRender data={data} />
          </Paper>
        </>
      )}
    </PageWrapper>
  )
}

export default CreatePost
