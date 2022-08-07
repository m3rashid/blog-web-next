import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Button,
  Container,
} from '@mantine/core'
import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSession, signIn } from 'next-auth/react'

import PageWrapper from 'components/globals/pageWrapper'
import { useNotification } from 'components/helpers/useNotification'

const Auth = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const { loadingNotif, updateFailureNotif, updateSuccessNotif } =
    useNotification({ id: 'login-signup' })

  useEffect(() => {
    if (session) router.replace('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  const [loading, setLoading] = useState(false)
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async () => {
    setLoading(true)
    loadingNotif()
    const values = {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
    }
    if (!values.username || !values.password) {
      updateFailureNotif({
        errorMsg: {
          title: 'Invalid Data',
          message: 'Please fill in all fields',
        },
      })
      return
    }
    try {
      await signIn('credentials', { ...values, callbackUrl: '/' })
      updateSuccessNotif({
        successMsg: {
          title: 'Login Success',
          message: 'Your login was successful',
        },
      })
      setLoading(false)
    } catch (err) {
      updateFailureNotif({
        errorMsg: {
          title: 'Internal Server error',
          message: 'Could not get response from server',
        },
      })
      setLoading(false)
    }
  }

  return (
    <PageWrapper>
      <Head>
        <title>Admin Login | Cubicle</title>
        <meta name="description" content="Admin Login | Cubicle" />
        <meta name="og:title" content="Admin Login | Cubicle" />
        <meta name="og:description" content="Admin Login | Cubicle" />
        <meta name="og:url" content="https://cubicle.vercel.app/auth" />
        <meta name="twitter:title" content="Admin Login | Cubicle" />
        <meta name="twitter:description" content="Admin Login | Cubicle" />
        <link rel="apple-touch-icon" href="/favicon.png" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
        <meta name="image" content="https://cubicle.vercel.app/favicon.png" />
        <meta
          name="og:image"
          content="https://cubicle.vercel.app/favicon.png"
        />
        <meta
          name="twitter:image"
          content="https://cubicle.vercel.app/favicon.png"
        />
      </Head>
      <Container size={420} my={40}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Title
            order={2}
            align="center"
            mb={20}
            sx={(theme) => ({ fontFamily: theme.fontFamily })}
          >
            Admin Login
          </Title>

          <TextInput
            id="username"
            label="Username"
            placeholder="username"
            ref={usernameRef}
            required
          />
          <PasswordInput
            label="Password"
            id="password"
            placeholder="Your password"
            required
            ref={passwordRef}
            mt="md"
          />
          <Button fullWidth mt="xl" onClick={handleSubmit} loading={loading}>
            Sign in
          </Button>
        </Paper>
      </Container>
    </PageWrapper>
  )
}

export default Auth
