import { FC } from 'react'
import { Box, Group, Image, Text, Title } from '@mantine/core'

interface IProps {}

const Hero: FC<IProps> = () => {
  return (
    <Group
      sx={(theme) => ({
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: '32px',
        margin: '50px 0',
        [theme.fn.smallerThan('sm')]: {
          flexDirection: 'column',
        },
      })}
    >
      <Box style={{ flex: 1 }}>
        <Title
          order={2}
          style={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <Text
            sx={(theme) => ({
              fontSize: '3rem',
              color:
                theme.colorScheme === 'dark'
                  ? theme.colors.gray[1]
                  : theme.colors.dark[5],
            })}
          >
            Cubicle
          </Text>
          <Text
            sx={(theme) => ({
              fontSize: '2.5rem',
              color:
                theme.colorScheme === 'dark'
                  ? theme.primaryColor
                  : theme.colors.cyan[6],
            })}
          >
            Welcomes you
          </Text>
        </Title>
        <Text style={{ marginTop: '16px', fontSize: '1.2rem' }}>
          Cubicle is an online portal for techies which mainly focuses on the
          life of programmers in general. It also features coding tips, tricks
          and motivation
        </Text>
      </Box>
      <Box style={{ flex: 1 }}>
        <Image alt="Login Image" fit="cover" src="/hero.svg" />
      </Box>
    </Group>
  )
}

export default Hero
