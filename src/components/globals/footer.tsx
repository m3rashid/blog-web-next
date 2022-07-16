import React from 'react'
import {
  createStyles,
  Container,
  Group,
  ActionIcon,
  Image,
  Box,
} from '@mantine/core'
import { BrandTwitter, BrandYoutube, BrandInstagram } from 'tabler-icons-react'

const useStyles = createStyles((theme) => ({
  footer: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },

  logo: {
    height: '100%',
    marginRight: '20px',
  },

  inner: {
    height: '150px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },
}))

interface IProps {}

const Footer: React.FC<IProps> = () => {
  const { classes } = useStyles()

  return (
    <Box className={classes.footer}>
      <Container size="lg" className={classes.inner}>
        <Box>
          <Image
            className={classes.logo}
            src="/favicon.png"
            height="60px"
            alt=""
          />
        </Box>
        <Group spacing={0} className={classes.links} position="right" noWrap>
          <ActionIcon size="lg">
            <BrandTwitter size={18} />
          </ActionIcon>
          <ActionIcon size="lg">
            <BrandYoutube size={18} />
          </ActionIcon>
          <ActionIcon size="lg">
            <BrandInstagram size={18} />
          </ActionIcon>
        </Group>
      </Container>
    </Box>
  )
}

export default Footer
