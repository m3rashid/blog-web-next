import { createStyles } from '@mantine/core';

export const useGlobalStyles = createStyles((theme) => ({
  backgroundColor: {
    backgroundColor: theme.colors.dark[5],
  },
  themeColor: {
    color: theme.colors.gray[1],
  },
  brandColor: {
    color: theme.colors.brand,
  },
  twoColumnGridHeightFix: {
    height: 'min-content',
  },
  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colors.dark[0],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25),
      color: theme.colors[theme.primaryColor][3],
    },
  },
  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25),
      color: theme.colors[theme.primaryColor][3],
    },
  },
}));
