import {
  createStyles,
  Group,
  MultiSelect,
  Paper,
  TextInput,
} from '@mantine/core'
import React from 'react'
import { useRecoilValue } from 'recoil'
import {
  Article,
  Webhook,
  Photo,
  Notification,
  ListCheck,
} from 'tabler-icons-react'

import { categoryAtom } from 'components/atoms/categories'

const useStyles = createStyles((theme) => ({
  buttonTop: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    flexDirection: 'row-reverse',
  },
  input: {
    flexGrow: 1,
  },
  multiselect: {
    marginTop: '15px',
  },
}))

export interface IPostMeta {
  title: string
  slug: string
  bannerImageUrl: string
  categories: string[]
  keywords: string
}

interface IProps {
  postMeta: IPostMeta
  setPostMeta: React.Dispatch<React.SetStateAction<IPostMeta>>
}

const TitleSlug: React.FC<IProps> = ({ postMeta, setPostMeta }) => {
  const { classes } = useStyles()
  const categories = useRecoilValue(categoryAtom)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPostMeta((prev) => ({ ...prev, [name]: value }))
  }

  const handleMultiSelectChange = (val: string[]) => {
    setPostMeta((prev) => ({ ...prev, categories: val }))
  }

  return (
    <Paper
      shadow="xs"
      p="md"
      style={{
        marginBottom: '30px',
        paddingTop: '40px',
        paddingBottom: '40px',
      }}
    >
      <Group>
        <TextInput
          name="title"
          value={postMeta.title}
          required
          icon={<Article />}
          className={classes.input}
          onChange={handleChange}
          placeholder="Enter Post title"
        />
        <TextInput
          name="slug"
          value={postMeta.slug}
          required
          icon={<Webhook />}
          className={classes.input}
          onChange={handleChange}
          placeholder="Enter Post slug"
        />
      </Group>
      <TextInput
        name="bannerImageUrl"
        value={postMeta.bannerImageUrl}
        required
        icon={<Photo />}
        className={classes.input}
        style={{ marginTop: '15px' }}
        onChange={handleChange}
        placeholder="Enter banner image Url"
      />
      <MultiSelect
        data={categories}
        value={postMeta.categories}
        onChange={handleMultiSelectChange}
        icon={<Notification />}
        className={classes.multiselect}
        maxDropdownHeight={160}
        placeholder="Select categories for your post"
      />
      <TextInput
        name="keywords"
        value={postMeta.keywords}
        required
        icon={<ListCheck />}
        className={classes.input}
        style={{ marginTop: '15px' }}
        onChange={handleChange}
        placeholder="Enter keywords for your post"
      />
    </Paper>
  )
}

export default TitleSlug
