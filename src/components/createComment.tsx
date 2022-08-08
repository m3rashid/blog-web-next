import {
  Button,
  Checkbox,
  createStyles,
  Paper,
  SimpleGrid,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core'
import { FC, useState } from 'react'
import { AlphabetLatin } from 'tabler-icons-react'

import useHttp from 'components/helpers/useHttp'
import { SingleSectionRender } from 'components/post/showRender'

const useStyles = createStyles((theme) => ({
  input: {
    fontFamily: theme.fontFamily,
    input: {},
  },
}))

interface IProps {
  postId: string
}

interface IComment {
  name: string
  comment: string
  remember: boolean
}

const CreateComment: FC<IProps> = ({ postId }) => {
  const { classes } = useStyles()
  const { loading, request } = useHttp('create-comment')
  const [comment, setComment] = useState<IComment>({
    name: window.localStorage.getItem('myName') || '',
    comment: '',
    remember: true,
  })
  const handleAddComment = async () => {
    if (comment.remember) window.localStorage.setItem('myName', comment.name)
    else window.localStorage.removeItem('myName')

    const { data: saveRes } = await request({
      endpoint: '/api/comment/create',
      body: {
        name: comment.name,
        comment: comment.comment,
        postId: postId,
      },
    })
    if (!saveRes) return
    setComment((prev) => ({ ...prev, comment: '' }))
  }

  return (
    <Paper shadow="xs" radius="md" p={20}>
      <Title
        sx={(theme) => ({ fontFamily: theme.fontFamily, marginBottom: '10px' })}
        order={3}
      >
        Join the Discussion
      </Title>
      <SimpleGrid>
        <TextInput
          name="name"
          label="Enter your name"
          value={comment.name}
          required
          icon={<AlphabetLatin />}
          className={classes.input}
          onChange={(e) =>
            setComment((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="Enter your name"
        />
        <Checkbox
          checked={comment.remember}
          onChange={(e) =>
            setComment((prev) => ({ ...prev, remember: e.target.checked }))
          }
          label="Remember my name for the next time"
        />
        <Textarea
          minRows={6}
          value={comment.comment}
          onChange={(e) =>
            setComment((prev) => ({ ...prev, comment: e.target.value }))
          }
          required
          label="Enter your comment"
          placeholder="Enter your comment (markdown supported)"
        />
        {comment.comment.length > 0 && (
          <SingleSectionRender data={comment.comment} />
        )}
        <Button onClick={handleAddComment} loading={loading}>
          Add Comment
        </Button>
      </SimpleGrid>
    </Paper>
  )
}

export default CreateComment
