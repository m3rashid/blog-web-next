import {
  ColorSchemeProvider,
  MantineProvider,
  ColorScheme,
  MantineThemeOverride,
} from '@mantine/core'
import { FC, ReactNode, useEffect, useState, createContext } from 'react'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'

import Footer from 'components/globals/footer'
import TopHeader from 'components/globals/header'
import ScrollToTop from 'components/globals/scrollToTop'
import { ICategory } from 'components/helpers/types'
import axios from 'axios'
import { SERVER_URL } from 'components/helpers/instance'

interface IProps {
  children: ReactNode
}

export const categoryContext = createContext<ICategory[]>([])

const RootWrapper: FC<IProps> = ({ children }) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark')
  const [categories, setCategories] = useState<ICategory[]>([])

  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
    localStorage.setItem('theme', colorScheme === 'dark' ? 'light' : 'dark')
    if (value === 'light' || value === 'dark') {
      setColorScheme(value)
      localStorage.setItem('theme', value)
    } else {
      setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')
      localStorage.setItem('theme', colorScheme === 'dark' ? 'light' : 'dark')
    }
  }

  const getCategories = async () => {
    const res = await axios.post(`${SERVER_URL}/category/all`)
    if (!res) return
    setCategories(res.data)
  }

  useEffect(() => {
    getCategories().then().catch()
    const localTheme = window.localStorage.getItem('theme')
    if (localTheme) setColorScheme(localTheme as ColorScheme)

    if (localTheme === 'light' || localTheme === 'dark') {
      toggleColorScheme(localTheme as ColorScheme)
    } else {
      const darkTheme = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
      toggleColorScheme(darkTheme ? 'dark' : 'light')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const theme: MantineThemeOverride = {
    colorScheme,
    primaryColor: 'cyan',
    fontFamily: 'Quicksand, sans-serif',
  }

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          ...theme,
          colors: { ...theme.colors, brand: ['#15AABF'] },
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <NotificationsProvider limit={5} position="top-right">
          <ModalsProvider>
            <TopHeader
              colorScheme={colorScheme}
              toggleColorScheme={toggleColorScheme}
            />
            <categoryContext.Provider value={categories}>
              {children}
            </categoryContext.Provider>
            <Footer />
            <ScrollToTop />
          </ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default RootWrapper
