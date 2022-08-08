import {
  Button,
  createStyles,
  Modal,
  SimpleGrid,
  TextInput,
} from '@mantine/core'
import { AlphabetLatin, Webhook } from 'tabler-icons-react'
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react'

import { instance } from 'components/helpers/instance'
import useHttp from 'components/helpers/useHttp'
import { useSetRecoilState } from 'recoil'
import { categoryAtom } from 'components/atoms/categories'

interface IProps {
  modalOpen: boolean
  setModalOpen: Dispatch<SetStateAction<boolean>>
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

const CreateCategoryModal: FC<IProps> = ({ modalOpen, setModalOpen }) => {
  const [category, setCategory] = useState({ name: '', slug: '' })
  const setGlobalCategories = useSetRecoilState(categoryAtom)
  const { classes } = useStyles()
  const { loading, request } = useHttp('create-category')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCategory((prev) => ({ ...prev, [name]: value }))
  }

  const handleCreateCategory = async () => {
    if (category.name.trim() === '' || category.slug.trim() === '') return
    const { data: saveRes } = await request({
      endpoint: '/category/create',
      body: category,
    })
    setModalOpen(false)
    if (!saveRes) return
    setCategory({ name: '', slug: '' })
    setGlobalCategories((prev) => [...prev, saveRes])
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
