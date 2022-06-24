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
import { useRouter } from 'next/router'
import { useSession, signIn } from 'next-auth/react'
import { Error404 } from 'tabler-icons-react'
import { showNotification } from '@mantine/notifications'

import PageWrapper from '../components/globals/pageWrapper'
import { useNotification } from '../components/helpers/useNotification'

type IAuthType = 'login' | 'register'

const Auth = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const { loadingNotif, updateFailureNotif, updateSuccessNotif } =
    useNotification({ id: 'login-signup' })

  React.useEffect(() => {
    if (session) {
      router.replace('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  const [authType, setAuthType] = React.useState<IAuthType>('login')
  const [loading, setLoading] = React.useState(false)
  const emailRef = React.useRef<HTMLInputElement>(null)
  const passwordRef = React.useRef<HTMLInputElement>(null)

  const handleChangeAuthType = () => {
    if (authType === 'login') setAuthType('register')
    else setAuthType('login')
  }

  const handleSubmit = async () => {
    setLoading(true)
    loadingNotif()
    const values = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    }
    if (!values.email || !values.password) {
      updateFailureNotif({
        errorMsg: {
          title: 'Invalid Data',
          message: 'Please fill in all fields',
        },
      })
      return
    }
    const res = await signIn('credentials', { ...values, callbackUrl: '/' })
    if (!res) {
      updateFailureNotif({
        errorMsg: {
          title: 'Internal Server error',
          message: 'Could not get response from server',
        },
      })
      // login failed
      return
    }
    setLoading(false)
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