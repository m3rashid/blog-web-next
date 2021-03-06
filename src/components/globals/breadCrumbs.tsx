import React from 'react'
import { useRouter } from 'next/router'
import { Breadcrumbs, createStyles, Text } from '@mantine/core'

const useStyles = createStyles((theme) => ({
  crumbs: {
    color: theme.colors.cyan[4],
    fontWeight: 500,
    marginBottom: theme.spacing.xl,
    marginTop: theme.spacing.xs,
  },
}))

interface IProps {}

const BreadCrumbs: React.FC<IProps> = () => {
  const { classes } = useStyles()
  const { asPath: path } = useRouter()

  const paths = React.useMemo(() => {
    if (path === '/') return null
    const pathItems = path.split('/').slice(1)

    return pathItems.reduce(
      (acc, curr) => [...acc, curr.toLocaleUpperCase().replaceAll('-', ' ')],
      ['HOME']
    )
  }, [path])

  return (
    <Breadcrumbs className={classes.crumbs} separator=">">
      {paths?.map((item, index) => (
        <Text key={index}>{item}</Text>
      ))}
    </Breadcrumbs>
  )
}

export default React.memo(BreadCrumbs)
