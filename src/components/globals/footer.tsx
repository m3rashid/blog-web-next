import React from 'react'
import {
  createStyles,
  Container,
  Group,
  ActionIcon,
  Image,
  Box,
  useMantineColorScheme,
} from '@mantine/core'
import {
  BrandTwitter,
  BrandYoutube,
  BrandInstagram,
  BrandGithub,
  BrandLinkedin,
  BrandGmail,
} from 'tabler-icons-react'

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

const footerMap = (isDark: Boolean) => [
  {
    url: 'https://github.com/m3rashid',
    icon: <BrandGithub size={18} />,
  },
  {
    url: 'https://twitter.com/m3_rashid',
    icon: <BrandTwitter size={18} />,
  },
  {
    url: 'https://www.linkedin.com/in/m3rashid/',
    icon: <BrandLinkedin size={18} />,
  },
  {
    url: 'mailto:m3rashid.hussain@gmail.com',
    icon: <BrandGmail size={18} />,
  },
  {
    url: 'https://www.instagram.com/m3_rashid/',
    icon: <BrandInstagram size={18} />,
  },
  {
    url: 'https://www.youtube.com/channel/UCeNqGjDNF0JJdWbd8jrgJdw',
    icon: <BrandYoutube size={18} />,
  },
  {
    url: 'https://dev.to/m3rashid',
    icon: (
      <Image
        src={isDark ? '/logos/dev_white.png' : '/logos/dev_black.png'}
        alt="dev.to"
      />
    ),
  },
]

const Footer: React.FC<IProps> = () => {
  const { classes } = useStyles()
  const theme = useMantineColorScheme()

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
          {footerMap(theme.colorScheme === 'dark').map((item) => (
            <ActionIcon
              component="a"
              href={item.url}
              target="_blank"
              key={item.url}
              size="lg"
            >
              {item.icon}
            </ActionIcon>
          ))}
        </Group>
      </Container>
    </Box>
  )
}

export default Footer
