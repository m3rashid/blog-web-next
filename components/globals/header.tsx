import {
  Burger,
  Center,
  Container,
  createStyles,
  Group,
  Header,
  Image,
  Paper,
  Transition,
} from '@mantine/core'
import React from 'react'
import { useRouter } from 'next/router'
import { useSetRecoilState } from 'recoil'
import { Moon, Sun } from 'tabler-icons-react'
import { useBooleanToggle } from '@mantine/hooks'

import { instance } from 'components/helpers/instance'
import { categoryAtom } from 'components/atoms/categories'
import HeaderProfileDropdown from 'components/globals/headerProfileDropdown'

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

  dropdown: {
    position: 'absolute',
    top: `calc(${HEADER_HEIGHT}px + 10px)`,
    left: '8px',
    borderRadius: '5px',
    right: '8px',
    zIndex: 0,
    borderTopWidth: 0,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    flexWrap: 'wrap',
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    cursor: 'pointer',

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color:
        theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color:
        theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
    },
  },
  control: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[8]
        : theme.colors.gray[0],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 1000,
    paddingLeft: theme.spacing.sm,
    paddingRight: 4,
    width: 136,
    height: 36,
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

  value: {
    lineHeight: 1,
  },
}))

interface IProps {
  colorScheme: any
  toggleColorScheme: () => void
}

const TopHeader: React.FC<IProps> = ({ colorScheme, toggleColorScheme }) => {
  const setCategories = useSetRecoilState(categoryAtom)
  const getAllCategories = async () => {
    const res = await instance.post('/category/all')
    const data = res.data.map((cat: any) => ({
      label: cat.name,
      slug: cat.slug,
      value: cat._id,
    }))
    setCategories(data)
  }

  React.useEffect(() => {
    getAllCategories().then().catch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [opened, toggleOpened] = useBooleanToggle(false)
  const router = useRouter()
  const { classes } = useStyles()

  const Icon = colorScheme === 'dark' ? Sun : Moon
  const imgLogo = '/favicon.png'

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
          <Image className={classes.logo} src={imgLogo} height="60px" alt="" />
          <div className={classes.cubicle}>Cubicle</div>
        </div>

        <Group spacing={5} className={classes.links}>
          <HeaderProfileDropdown />
          <ThemeChanger />
        </Group>

        <Burger
          opened={opened}
          onClick={() => toggleOpened()}
          className={classes.burger}
          size="sm"
        />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} style={{ ...styles }}>
              <HeaderProfileDropdown />
              <ThemeChanger />
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  )
}

export default TopHeader
