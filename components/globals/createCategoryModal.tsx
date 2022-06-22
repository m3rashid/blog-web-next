import {
  Button,
  createStyles,
  Modal,
  SimpleGrid,
  TextInput,
} from '@mantine/core'
import React from 'react'
import { AlphabetLatin, Webhook } from 'tabler-icons-react'
import { useSafeApiCall } from '../api/safeApiCall'

interface IProps {
  modalOpen: boolean
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const useStyles = createStyles((theme) => ({
  input: {
    fontFamily: theme.fontFamily,
    input: {},
  },
  modal: {
    fontWeight: 700,
  },
}))

const CreateCategoryModal: React.FC<IProps> = ({ modalOpen, setModalOpen }) => {
  const { safeApiCall, loading } = useSafeApiCall()
  const [category, setCategory] = React.useState({ name: '', slug: '' })
  const { classes } = useStyles()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCategory((prev) => ({ ...prev, [name]: value }))
  }

  const handleCreateCategory = async () => {
    const res = await safeApiCall({
      body: category,
      endpoint: '/category/create',
      notif: { id: 'create-category', show: true },
    })

    if (!res) return
    setModalOpen(false)
    setCategory({ name: '', slug: '' })
  }

  return (
    <Modal
      opened={modalOpen}
      onClose={() => setModalOpen(false)}
      title="Create a new Category for posts"
      className={classes.modal}
    >
      <SimpleGrid>
        <TextInput
          name="name"
          label="Enter a name for the category"
          value={category.name}
          required
          icon={<AlphabetLatin />}
          className={classes.input}
          onChange={handleChange}
          placeholder="Enter Name for the category"
        />
        <TextInput
          name="slug"
          label="Enter a slug for the category"
          value={category.slug}
          required
          icon={<Webhook />}
          className={classes.input}
          onChange={handleChange}
          placeholder="Enter slug (unique) for the category"
        />
        <Button
          className={classes.input}
          onClick={handleCreateCategory}
          loading={loading}
        >
          Create Category
        </Button>
      </SimpleGrid>
    </Modal>
  )
}

export default CreateCategoryModal
