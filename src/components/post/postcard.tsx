import { FC } from 'react'
import {
  createStyles,
  Paper,
  Text,
  Title,
  Button,
  Box,
  Group,
} from '@mantine/core'
import { useRouter } from 'next/router'

const useStyles = createStyles((theme) => ({
  card: {
    height: 400,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  title: {
    fontFamily: theme.fontFamily,
    fontWeight: 900,
    lineHeight: 1.2,
    fontSize: 32,
    marginTop: theme.spacing.xs,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },

  category: {
    color: theme.black,
    fontWeight: 700,
    textTransform: 'uppercase',
    backgroundColor: theme.primaryColor,
    padding: '2px 5px',
    borderRadius: '5px',
  },
}))

interface IProps {
  image: string
  title: string
  categories: {
    name: string
    _id: string
  }[]
  slug: string
}

const PostCard: FC<IProps> = ({ image, title, categories, slug }) => {
  const { classes } = useStyles()
  const router = useRouter()

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={(theme) => ({
        backgroundImage:
          theme.colorScheme === 'dark'
            ? `linear-gradient(to bottom, rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.5) 100%), url(${image})`
            : `linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.4) 100%), url(${image})`,
      })}
      className={classes.card}
    >
      <Box>
        <Group style={{ gap: '5px' }}>
          {categories.map((cat) => {
            return (
              <Text key={cat._id} className={classes.category} size="xs">
                {cat.name}
              </Text>
            )
          })}
        </Group>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </Box>
      <Button onClick={() => router.push(`/blogs/${slug}`)}>
        Read article
      </Button>
    </Paper>
  )
}

export default PostCard
