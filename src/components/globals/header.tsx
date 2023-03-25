import { Container, createStyles, Header, Image } from '@mantine/core';
import { FC } from 'react';
import { useRouter } from 'next/router';

export const HEADER_HEIGHT = 70;
export const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
    backgroundColor: theme.colors.dark[6],
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.white,
    cursor: 'pointer',
  },
  logo: {
    height: '100%',
    marginRight: '20px',
  },
  cubicle: {
    fontSize: 30,
    fontWeight: 700,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
}));

interface IProps {}

const TopHeader: FC<IProps> = () => {
  const router = useRouter();
  const imgLogo = '/favicon.png';
  const { classes } = useStyles();

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container size='lg' className={classes.header}>
        <div className={classes.logoContainer} onClick={() => router.push('/')}>
          <Image
            className={classes.logo}
            src={imgLogo}
            height='60px'
            alt='cubicle logo'
          />
          <div className={classes.cubicle}>Cubicle</div>
        </div>
      </Container>
    </Header>
  );
};

export default TopHeader;
