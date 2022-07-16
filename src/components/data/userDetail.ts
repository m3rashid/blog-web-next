import {
  BrandGithub,
  BrandTwitter,
  BrandLinkedin,
  BrandGmail,
  BrandInstagram,
  BrandYoutube,
  World,
} from 'tabler-icons-react'

interface IDetails {
  url: string
  label: string
  type: string
  icon: any
}

interface ISocialAccounts {
  github: IDetails
  twitter: IDetails
  linkedin: IDetails
  email: IDetails
  instagram: IDetails
  youtube: IDetails
  portfolio: IDetails
  devto?: IDetails
}

export const userLinks: ISocialAccounts = {
  github: {
    url: 'https://github.com/m3rashid',
    label: 'Github Account',
    type: 'gray',
    icon: BrandGithub,
  },
  twitter: {
    url: 'https://twitter.com/m3_rashid',
    label: 'Twitter Account',
    type: 'twitter',
    icon: BrandTwitter,
  },
  //   devto: {
  //     url: 'https://dev.to/m3rashid',
  //     label: 'Dev Account',
  //     type: 'gray',
  //     icon: '',
  //   },
  linkedin: {
    url: 'https://www.linkedin.com/in/m3rashid/',
    label: 'LinkedIn Account',
    type: 'linkedin',
    icon: BrandLinkedin,
  },
  email: {
    url: 'mailto:m3rashid.hussain@gmail.com',
    label: 'Mail Rashid',
    type: 'gray',
    icon: BrandGmail,
  },
  instagram: {
    url: 'https://www.instagram.com/m3_rashid/',
    label: 'Instagram',
    type: 'pink',
    icon: BrandInstagram,
  },
  youtube: {
    url: 'https://www.youtube.com/channel/UCeNqGjDNF0JJdWbd8jrgJdw',
    label: 'Youtube',
    type: 'red',
    icon: BrandYoutube,
  },
  portfolio: {
    url: 'https://m3rashid.netlify.app/',
    label: 'Portfolio',
    type: 'blue',
    icon: World,
  },
}

export const authorDetails = {
  id: 'admin-user-mdrashidhussain',
  name: 'MD Rashid Hussain',
  avatar: 'https://m3rashid.netlify.app/images/rashid.png',
  website: userLinks.portfolio.url,
  linkedIn: userLinks.linkedin.url,
  github: userLinks.github.url,
  twitter: userLinks.twitter.url,
  youtube: userLinks.youtube.url,
  email: userLinks.email.url,
  instagram: userLinks.instagram.url,
}

export type IAuthorDetails = typeof authorDetails
