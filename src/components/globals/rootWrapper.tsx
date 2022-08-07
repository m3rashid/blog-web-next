import {
  ColorSchemeProvider,
  MantineProvider,
  ColorScheme,
  MantineThemeOverride,
} from '@mantine/core'
import { FC, ReactNode, useEffect, useState } from 'react'
import { RecoilRoot } from 'recoil'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'

import Footer from 'components/globals/footer'
import TopHeader from 'components/globals/header'
import ScrollToTop from 'components/globals/scrollToTop'

interface IProps {
  children: ReactNode
}

const RootWrapper: FC<IProps> = ({ children }) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark')

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

  useEffect(() => {
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
    <RecoilRoot>
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
              {children}
              <Footer />
              <ScrollToTop />
            </ModalsProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </RecoilRoot>
  )
}

export default RootWrapper
