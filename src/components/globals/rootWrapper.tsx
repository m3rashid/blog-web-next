import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import { FC, ReactNode, useEffect, useState, createContext } from 'react';

import Footer from 'components/globals/footer';
import TopHeader from 'components/globals/header';
import ScrollToTop from 'components/globals/scrollToTop';
import { ICategory } from 'components/helpers/types';
import axios from 'axios';
import { SERVER_URL } from 'components/helpers/instance';

interface IProps {
  children: ReactNode;
}

export const categoryContext = createContext<ICategory[]>([]);

const RootWrapper: FC<IProps> = ({ children }) => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const getCategories = async () => {
    const res = await axios.post(`${SERVER_URL}/category/all`);
    if (!res) return;
    setCategories(res.data);
  };

  useEffect(() => {
    getCategories().then().catch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const theme: MantineThemeOverride = {
    primaryColor: 'cyan',
    fontFamily: 'Quicksand, sans-serif',
    colorScheme: 'dark',
  };

  return (
    <MantineProvider
      theme={{
        ...theme,
        colors: { ...theme.colors, brand: ['#15AABF'] },
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <TopHeader />
      <categoryContext.Provider value={categories}>
        {children}
      </categoryContext.Provider>
      <Footer />
      <ScrollToTop />
    </MantineProvider>
  );
};

export default RootWrapper;
