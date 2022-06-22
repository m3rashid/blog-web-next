import React from 'react'
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Group,
  Button,
  Container,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { Error404 } from 'tabler-icons-react'

import PageWrapper from '../components/globals/pageWrapper'
import { useSafeApiCall } from '../components/api/safeApiCall'
import { useRecoilState } from 'recoil'
import { authAtom } from '../atoms/auth'
import { useNavigate } from 'react-router-dom'

type IAuthType = 'login' | 'register'

const Auth = () => {
  const [user, setUser] = useRecoilState(authAtom)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (user.isAuthenticated) {
      navigate('/', { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.isAuthenticated])

  const [authType, setAuthType] = React.useState<IAuthType>('login')
  const emailRef = React.useRef<HTMLInputElement>(null)
  const passwordRef = React.useRef<HTMLInputElement>(null)

  const { safeApiCall, loading } = useSafeApiCall()

  const handleChangeAuthType = () => {
    if (authType === 'login') setAuthType('register')
    else setAuthType('login')
  }

  const handleSubmit = async () => {
    const values = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    }
    if (!values.email || !values.password) {
      showNotification({
        color: 'red',
        icon: <Error404 />,
        title: 'Invalid Data',
        message: 'Please fill in all fields',
        autoClose: 5000,
      })
      return
    }

    const res = await safeApiCall({
      endpoint: `/auth/${authType}`,
      body: values,
      notif: { id: 'auth', show: true },
    })

    if (!res) return // error
    const { token, user } = res.data
    window.localStorage.setItem('token', token)
    setUser({ user: user, isAuthenticated: true })
  }

  return (
    <PageWrapper>
      <Container size={420} my={40}>
        <Title
          order={2}
          align="center"
          sx={(theme) => ({ fontFamily: theme.fontFamily, fontWeight: 900 })}
        >
          Welcome to Cubicle Internals
        </Title>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Title
            order={2}
            align="center"
            mb={20}
            sx={(theme) => ({ fontFamily: theme.fontFamily })}
          >{`${authType === 'login' ? 'Login' : 'Register'} here`}</Title>

          <TextInput
            label="Email"
            placeholder="user@example.com"
            ref={emailRef}
            required
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            ref={passwordRef}
            mt="md"
          />
          <Group position="apart" mt="md">
            <Checkbox label="Remember me" />
            <Anchor size="sm">Forgot password?</Anchor>
          </Group>
          <Button fullWidth mt="xl" onClick={handleSubmit} loading={loading}>
            {authType === 'login' ? 'Sign in' : 'Sign up'}
          </Button>
          <Text color="dimmed" size="sm" align="center" mt={10}>
            {authType === 'login'
              ? "Don't have an account yet?"
              : 'Already have an account?'}
            <Anchor size="sm" ml={5} onClick={handleChangeAuthType}>
              {authType === 'login' ? 'Create account' : 'Sign in'}
            </Anchor>
          </Text>
        </Paper>
      </Container>
    </PageWrapper>
  )
}

export default Auth
