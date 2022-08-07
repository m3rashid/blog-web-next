import {
  ArrowsLeftRight,
  Article,
  Edit,
  Notification,
  User,
} from 'tabler-icons-react'
import { useRouter } from 'next/router'
import { Avatar, Divider, Menu } from '@mantine/core'
import { signOut, useSession } from 'next-auth/react'
import { showNotification } from '@mantine/notifications'
import { Dispatch, FC, SetStateAction, useState } from 'react'

import CreateCategoryModal from 'components/globals/createCategoryModal'

const LoggedInActions: FC<{
  setModalOpen: Dispatch<SetStateAction<boolean>>
}> = ({ setModalOpen }) => {
  const router = useRouter()
  const { data: session } = useSession()

  const handleLogout = () => {
    signOut({ redirect: false })
    showNotification({
      title: 'Logged out Successfully',
      message: 'You have been logged out',
    })
  }

  return (
    <>
      <Menu.Label>Author Actions</Menu.Label>
      <Menu.Item
        icon={<Article size={14} />}
        onClick={() => router.push('/me/posts')}
      >
        All Posts
      </Menu.Item>
      <Menu.Item
        icon={<Edit size={14} />}
        onClick={() => router.push('/blogs/create')}
      >
        Create Post
      </Menu.Item>
      <Menu.Item
        icon={<Notification size={14} />}
        onClick={() => setModalOpen(true)}
      >
        Create Category
      </Menu.Item>

      <Divider />

      <Menu.Label>Your Session</Menu.Label>
      <Menu.Item icon={<ArrowsLeftRight size={14} />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </>
  )
}

interface IProps {}

const HeaderProfileDropdown: FC<IProps> = () => {
  const { data: session } = useSession()
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <CreateCategoryModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      {session && (
        <Menu
          control={
            <Avatar
              radius={100}
              size={30}
              color="yellow"
              style={{ cursor: 'pointer' }}
            >
              <User />
            </Avatar>
          }
        >
          <LoggedInActions setModalOpen={setModalOpen} />
        </Menu>
      )}
    </>
  )
}

export default HeaderProfileDropdown
