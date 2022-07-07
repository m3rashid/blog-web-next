import { createStyles } from '@mantine/core'

export const useCategoryStyles = createStyles((theme) => ({
  inner: {
    gridTemplateColumns: '1fr 1fr 1fr',
    [theme.fn.smallerThan('md')]: {
      gridTemplateColumns: '1fr 1fr',
    },
    [theme.fn.smallerThan('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
}))
