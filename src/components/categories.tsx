import { FC } from 'react'
import Link from 'next/link'
import { useRecoilValue } from 'recoil'
import { Anchor, Box, Paper, Title } from '@mantine/core'

import { categoryAtom } from 'components/atoms/categories'

interface IProps {}

const Categories: FC<IProps> = () => {
  const categories = useRecoilValue(categoryAtom)

  return (
    <Paper shadow="xs" radius="md" p={20}>
      <Title
        sx={(theme) => ({ fontFamily: theme.fontFamily, marginBottom: '10px' })}
        order={3}
      >
        Categories
      </Title>
      <Box>
        {categories.length > 0 &&
          categories.map((cat) => (
            <Box key={cat._id}>
              <Anchor
                style={{ fontWeight: 600 }}
                component={Link}
                href={`/category/${cat.slug}`}
              >
                {cat.name}
              </Anchor>
            </Box>
          ))}
      </Box>
    </Paper>
  )
}

export default Categories
