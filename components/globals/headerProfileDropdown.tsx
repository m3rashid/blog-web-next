import React from 'react'
import {
  ArrowsLeftRight,
  Article,
  Edit,
  Login,
  Notification,
  User,
  UserOff,
} from 'tabler-icons-react'
import { useRouter } from 'next/router'
import { Avatar, Divider, Menu } from '@mantine/core'
import { showNotification } from '@mantine/notifications'

import CreateCategoryModal from './createCategoryModal'
import { signOut, useSession } from 'next-auth/react'

const LoggedInActions: React.FC<{
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ setModalOpen }) => {
  const router = useRouter()
  const { data: session } = useSession()

  const handleLogout = () => {
    signOut()
    showNotification({
      title: 'Logged out Successfully',
      message: 'You have been logged out',
    })
  }

  return (
    <>
      <Menu.Label>Profile</Menu.Label>
      <Menu.Item
        icon={<User size={14} />}
        // onClick={() => router.push(`/author/${session.user.author?.slug}`)}
      >
        Profile
      </Menu.Item>
      <Menu.Item
        icon={<Edit size={14} />}
        onClick={() => router.push('/author/me/create')}
      >
        Modify Profile
      </Menu.Item>

      <Divider />

      <Menu.Label>Author Actions</Menu.Label>
      <Menu.Item
        icon={<Article size={14} />}
        onClick={() => router.push('/author/me/posts')}
      >
        All Posts
      </Menu.Item>
      <Menu.Item
        icon={<Edit size={14} />}
        onClick={() => router.push('/post/create')}
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

const NotLoggedInActions = () => {
  const router = useRouter()

  return (
    <>
      <Menu.Label>Session</Menu.Label>
      <Menu.Item
        icon={<Login size={14} />}
        onClick={() => router.push('/auth')}
      >
        Login
      </Menu.Item>
    </>
  )
}

interface IProps {}

const HeaderProfileDropdown: React.FC<IProps> = () => {
  const { data: session } = useSession()
  const [modalOpen, setModalOpen] = React.useState(false)

  return (
    <>
      <CreateCategoryModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <Menu
        control={
          <Avatar
            radius={100}
            size={30}
            color="yellow"
            style={{ cursor: 'pointer' }}
          >
            {session ? <User /> : <UserOff />}
          </Avatar>
        }
      >
        {session ? (
          <LoggedInActions setModalOpen={setModalOpen} />
        ) : (
          <NotLoggedInActions />
        )}
      </Menu>
    </>
  )
}

export default HeaderProfileDropdown
