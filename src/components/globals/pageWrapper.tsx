import { FC } from 'react';
import { Container, createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  root: {
    minHeight: '90vh',
    maxWidth: '100vw',
    overflowX: 'hidden',
    paddingTop: '10px',
    paddingBottom: '50px',
    backgroundColor: theme.colors.dark[5],
  },
}));

interface IProps {
  children: any;
}

const PageWrapper: FC<IProps> = ({ children }) => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <Container size='lg'>{children}</Container>
    </div>
  );
};

export default PageWrapper;
