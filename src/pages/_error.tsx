import Link from 'next/link'
import { Title, Text, Button, Container, Group } from '@mantine/core'

import { useStyles } from 'components/styles/404'
import PageWrapper from 'components/globals/pageWrapper'

const Error = () => {
  const { classes } = useStyles()

  return (
    <PageWrapper>
      <Container className={classes.root}>
        <div className={classes.label}>404</div>
        <Title className={classes.title}>An unexpected error occured</Title>
        <Text
          color="dimmed"
          size="lg"
          align="center"
          className={classes.description}
        >
          An unexpected error occured, please report to the developer if the
          error persists
        </Text>
        <Group position="center">
          <Link href="/">
            <Button variant="subtle" size="md">
              Take me back to home page
            </Button>
          </Link>
        </Group>
      </Container>
    </PageWrapper>
  )
}

export default Error
