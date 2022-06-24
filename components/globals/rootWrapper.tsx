import React from 'react'
import {
  ColorSchemeProvider,
  MantineProvider,
  ColorScheme,
  MantineThemeOverride,
} from '@mantine/core'
import { RecoilRoot } from 'recoil'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'

import ScrollToTop from './scrollToTop'
import TopHeader from '../globals/header'
import Footer from './footer'

interface IProps {
  children: React.ReactNode
}

const RootWrapper: React.FC<IProps> = ({ children }) => {
  const [colorScheme, setColorScheme] = React.useState<ColorScheme>('dark')

  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
    localStorage.setItem('theme', colorScheme === 'dark' ? 'light' : 'dark')
  }

  React.useEffect(() => {
    const localTheme = window.localStorage.getItem('theme')
    if (localTheme) {
      setColorScheme(localTheme as ColorScheme)
    }
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
