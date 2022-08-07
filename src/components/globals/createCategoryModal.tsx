import {
  Button,
  createStyles,
  Modal,
  SimpleGrid,
  TextInput,
} from '@mantine/core'
import React from 'react'
import { AlphabetLatin, Webhook } from 'tabler-icons-react'

import useHttp from 'components/helpers/useHttp'
import { trpc } from 'utils/trpc'

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
  const { loading, request } = useHttp('create-category')
  const [category, setCategory] = React.useState({ name: '', slug: '' })
  const { classes } = useStyles()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCategory((prev) => ({ ...prev, [name]: value }))
  }

  const handleCreateCategory = async () => {
    if (category.name.trim() === '' || category.slug.trim() === '') return
    const { data } = trpc.useMutation([
      'pro_category.create-category',
      { name: category.name, slug: category.slug },
    ])
    // const { data: saveRes } = await request({
    //   endpoint: '/category/create',
    //   body: category,
    // })
    setModalOpen(false)
    if (!saveRes) return
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
