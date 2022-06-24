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
import { showNotification } from '@mantine/notifications'
import React from 'react'
import { AlphabetLatin, Error404 } from 'tabler-icons-react'
import { SingleSectionRender } from './post/showRender'

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

const CreateComment: React.FC<IProps> = ({ postId }) => {
  const { classes } = useStyles()
  const [loading, setLoading] = React.useState(false)

  const [comment, setComment] = React.useState<IComment>({
    name: window.localStorage.getItem('myName') || '',
    comment: '',
    remember: true,
  })

  const handleAddComment = async () => {
    if (!comment.name || !comment.comment) {
      showNotification({
        id: 'empty-comment',
        title: 'Empty Comment',
        message: 'All fields are required',
        color: 'red',
        icon: <Error404 />,
        autoClose: 5000,
        disallowClose: false,
      })
      return
    }

    if (comment.remember) {
      window.localStorage.setItem('myName', comment.name)
    } else {
      window.localStorage.removeItem('myName')
    }

    // const res = await safeApiCall({
    //   body: {
    //     name: comment.name,
    //     comment: comment.comment,
    //     postId: postId,
    //   },
    //   endpoint: '/comment/create',
    //   notif: { id: 'create-comment', show: true },
    // })

    // if (!res) return
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
