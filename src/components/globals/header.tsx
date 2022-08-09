import {
  Center,
  Container,
  createStyles,
  Group,
  Header,
  Image,
} from '@mantine/core'
import { FC } from 'react'
import { useRouter } from 'next/router'
import { Moon, Sun } from 'tabler-icons-react'

export const HEADER_HEIGHT = 70
export const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },

  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    cursor: 'pointer',
  },

  logo: {
    height: '100%',
    marginRight: '20px',
  },

  cubicle: {
    fontSize: 30,
    fontWeight: 700,
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  iconWrapper: {
    height: 30,
    width: 30,
    borderRadius: 28,
    marginLeft: theme.spacing.xs,
    cursor: 'pointer',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.yellow[4]
        : theme.colors.dark[4],
    color: theme.colorScheme === 'dark' ? theme.black : theme.colors.blue[2],
  },
}))

interface IProps {
  colorScheme: any
  toggleColorScheme: () => void
}

const TopHeader: FC<IProps> = ({ colorScheme, toggleColorScheme }) => {
  const router = useRouter()
  const { classes } = useStyles()

  const imgLogo = '/favicon.png'
  const Icon = colorScheme === 'dark' ? Sun : Moon

  const ThemeChanger = () => (
    <Group position="center" my="xl">
      <Center className={classes.iconWrapper} aria-label="Toggle theme">
        <Icon onClick={() => toggleColorScheme()} />
      </Center>
    </Group>
  )

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container size="lg" className={classes.header}>
        <div className={classes.logoContainer} onClick={() => router.push('/')}>
          <Image
            className={classes.logo}
            src={imgLogo}
            height="60px"
            alt="cubicle logo"
          />
          <div className={classes.cubicle}>Cubicle</div>
        </div>

        <Group spacing={5}>
          <ThemeChanger />
        </Group>
      </Container>
    </Header>
  )
}

export default TopHeader
