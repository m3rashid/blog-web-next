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
import { useNavigate } from 'react-router-dom'
import { Avatar, Divider, Menu } from '@mantine/core'
import { SetterOrUpdater, useRecoilState } from 'recoil'
import { showNotification } from '@mantine/notifications'

import { authAtom, IAuthState } from '../../atoms/auth'
import CreateCategoryModal from './createCategoryModal'

const LoggedInActions = ({
  auth,
  setAuth,
  setModalOpen,
}: {
  auth: IAuthState
  setAuth: SetterOrUpdater<IAuthState>
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    setAuth({ isAuthenticated: false, user: {} as any })
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
        onClick={() => navigate(`/author/${auth.user.author?.slug}`)}
      >
        Profile
      </Menu.Item>
      <Menu.Item
        icon={<Edit size={14} />}
        onClick={() => navigate('/author/me/create')}
      >
        Modify Profile
      </Menu.Item>

      <Divider />

      <Menu.Label>Author Actions</Menu.Label>
      <Menu.Item
        icon={<Article size={14} />}
        onClick={() => navigate('/author/me/posts')}
      >
        All Posts
      </Menu.Item>
      <Menu.Item
        icon={<Edit size={14} />}
        onClick={() => navigate('/post/create')}
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
  const navigate = useNavigate()

  return (
    <>
      <Menu.Label>Session</Menu.Label>
      <Menu.Item icon={<Login size={14} />} onClick={() => navigate('/auth')}>
        Login
      </Menu.Item>
    </>
  )
}

interface IProps {}

const HeaderProfileDropdown: React.FC<IProps> = () => {
  const [auth, setAuth] = useRecoilState(authAtom)
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
            {auth.isAuthenticated ? <User /> : <UserOff />}
          </Avatar>
        }
      >
        {auth.isAuthenticated ? (
          <LoggedInActions
            auth={auth}
            setAuth={setAuth}
            setModalOpen={setModalOpen}
          />
        ) : (
          <NotLoggedInActions />
        )}
      </Menu>
    </>
  )
}

export default HeaderProfileDropdown
