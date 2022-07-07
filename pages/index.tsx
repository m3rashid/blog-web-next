import React from 'react'
import Head from 'next/head'

import PageWrapper from 'components/globals/pageWrapper'

interface IProps {}

const Home: React.FC<IProps> = () => {
  return (
    <PageWrapper>
      <Head>
        <title>MD Rashid Hussain</title>
      </Head>
      <div>Home</div>
    </PageWrapper>
  )
}

export default Home
