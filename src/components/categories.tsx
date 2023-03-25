import { FC, useContext } from 'react';
import Link from 'next/link';
import { Anchor, Box, Paper, Title } from '@mantine/core';
import { categoryContext } from './globals/rootWrapper';

interface IProps {}

const Categories: FC<IProps> = () => {
  const categories = useContext(categoryContext);

  return (
    <Paper shadow='xs' radius='md' p={20}>
      <Title
        sx={(theme) => ({ fontFamily: theme.fontFamily, marginBottom: '10px' })}
        order={3}
      >
        Categories
      </Title>
      <Box>
        {categories.length > 0 &&
          categories.map((cat) => (
            <Box key={cat.slug}>
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
  );
};

export default Categories;
