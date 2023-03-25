import { FC } from 'react';
import { useRouter } from 'next/router';
import { createStyles, Group, Image, Paper, Text, Title } from '@mantine/core';

import { IPostCardForCard } from 'components/helpers/types';

interface IProps {
  relatedPosts: IPostCardForCard[];
}

const useStyles = createStyles((theme) => ({
  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  body: {
    padding: theme.spacing.md,
  },
}));

const RelatedPosts: FC<IProps> = ({ relatedPosts }) => {
  const router = useRouter();

  const { classes } = useStyles();

  return (
    <Paper shadow='xs' radius='md' p={20}>
      <Title
        sx={(theme) => ({ fontFamily: theme.fontFamily, marginBottom: '10px' })}
        order={3}
      >
        Related Posts
      </Title>
      {relatedPosts.map((post) => (
        <Group
          noWrap
          spacing={0}
          key={post.slug}
          onClick={() => router.push(`/blogs/${post.slug}`)}
          style={{ marginBottom: '10px', cursor: 'pointer' }}
        >
          <Image alt='' src={post.bannerImageUrl} height={80} width={80} />
          <div className={classes.body}>
            <Text className={classes.title} mt='xs' mb='md'>
              {post.title}
            </Text>
          </div>
        </Group>
      ))}
    </Paper>
  );
};

export default RelatedPosts;
