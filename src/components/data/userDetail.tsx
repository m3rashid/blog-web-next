import {
  BrandGithub,
  BrandTwitter,
  BrandLinkedin,
  BrandGmail,
  BrandInstagram,
  BrandYoutube,
  World,
} from 'tabler-icons-react'
import { Image } from '@mantine/core'

export const authorDetails = {
  id: 'admin-user-mdrashidhussain',
  name: 'MD Rashid Hussain',
  avatar: 'https://m3rashid.netlify.app/images/rashid.jpg',
  github: 'https://github.com/m3rashid',
  twitter: 'https://twitter.com/m3_rashid',
  linkedIn: 'https://www.linkedin.com/in/m3rashid/',
  email: 'mailto:m3rashid.hussain@gmail.com',
  instagram: 'https://www.instagram.com/m3_rashid/',
  youtube: 'https://www.youtube.com/channel/UCeNqGjDNF0JJdWbd8jrgJdw',
  website: 'https://m3rashid.in/',
  devTo: 'https://dev.to/m3rashid',
}

export type IAuthorDetails = typeof authorDetails

export const userLinks = (isDark: boolean) => ({
  github: {
    url: authorDetails.github,
    label: 'Github Account',
    type: 'gray',
    icon: <BrandGithub />,
  },
  twitter: {
    url: authorDetails.twitter,
    label: 'Twitter Account',
    type: 'twitter',
    icon: <BrandTwitter />,
  },
  linkedin: {
    url: authorDetails.linkedIn,
    label: 'LinkedIn Account',
    type: 'linkedin',
    icon: <BrandLinkedin />,
  },
  email: {
    url: authorDetails.email,
    label: 'Mail Rashid',
    type: 'gray',
    icon: <BrandGmail />,
  },
  instagram: {
    url: authorDetails.instagram,
    label: 'Instagram',
    type: 'pink',
    icon: <BrandInstagram />,
  },
  youtube: {
    url: authorDetails.youtube,
    label: 'Youtube',
    type: 'red',
    icon: <BrandYoutube />,
  },
  portfolio: {
    url: authorDetails.website,
    label: 'Portfolio',
    type: 'blue',
    icon: <World />,
  },
  devto: {
    url: authorDetails.devTo,
    label: 'Dev To',
    type: 'gray',
    icon: (
      <Image
        src={isDark ? '/logos/dev_white.png' : '/logos/dev_black.png'}
        alt="dev.to"
      />
    ),
  },
})
