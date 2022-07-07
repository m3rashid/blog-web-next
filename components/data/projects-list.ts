export const techList = {
  react: 'React',
  node: 'Node.js',
  mysql: 'MySQL',
  ts: 'TypeScript',
  js: 'JavaScript',
  next: 'Next.js',
  tailwind: 'Tailwind CSS',
  ejs: 'EJs',
  mongo: 'MongoDB',
  flask: 'Flask',
  sqlite: 'SQLite',
  html: 'HTML',
  css: 'CSS',
  express: 'Express.js',
  dbms: 'DBMS',
  os: 'Operating Systems',
}

export const projectsList = [
  {
    id: 0,
    title: 'JMI Connect',
    logo: '/images/projects/jmiconnect.png',
    link: 'https://jmi-connect.netlify.app/',
    desc: 'Social Media App for JMI Students',
    technologies: [techList.react, techList.node, techList.mysql],
  },
  {
    id: 1,
    title: 'Cubicle',
    logo: '/images/projects/cubicle.jpg',
    link: 'https://cubicle.vercel.app/',
    desc: 'My blog website',
    technologies: [techList.ts, techList.next, techList.tailwind],
  },
  {
    id: 2,
    title: 'Taxtds',
    logo: '/images/projects/taxtds.jpeg',
    link: 'https://taxtds.herokuapp.com/',
    desc: 'Local business directory website for all your finance and tax needs',
    technologies: [techList.js, techList.ejs, techList.node, techList.mongo],
  },
  {
    id: 3,
    title: 'Social',
    logo: '/images/projects/social.png',
    link: 'https://github.com/m3rashid/social',
    desc: 'Social media website',
    technologies: [techList.ts, techList.react, techList.node, techList.mongo],
  },
  {
    id: 4,
    title: 'ZUNI',
    logo: '/images/projects/zuni.jpeg',
    link: 'https://zuni.netlify.app/',
    desc: 'Zillion utility neural authentication interface',
    technologies: [techList.js, techList.flask, techList.sqlite],
  },
  {
    id: 5,
    title: 'Whatsapp',
    logo: '/images/projects/whatsapp.jpeg',
    link: 'https://github.com/m3rashid/whatsapp-bot',
    desc: 'Whatsapp Bot',
    technologies: [techList.ts, techList.node, techList.mongo],
  },
  {
    id: 6,
    title: 'Covid Me',
    logo: '/images/projects/covid.jpeg',
    link: 'https://github.com/m3rashid/covid_project',
    desc: 'Getting covid-19 data and helping people using twitter',
    technologies: [techList.js, techList.node, techList.ejs],
  },
  {
    id: 7,
    title: 'Hack JMI ML',
    logo: '/images/projects/hack.jpeg',
    link: 'https://github.com/m3rashid/HackJMI2-CheemsGamg',
    desc: 'Hackathon project',
    technologies: [
      techList.js,
      techList.react,
      techList.flask,
      techList.sqlite,
    ],
  },
  {
    id: 8,
    title: 'Mini Projects',
    logo: '/images/projects/mini.jpeg',
    link: 'https://m3rashid.github.io/mini_projects/',
    desc: 'Mini projects',
    technologies: [techList.js, techList.html, techList.css],
  },
]
