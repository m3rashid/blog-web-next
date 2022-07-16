import React from 'react'
import Head from 'next/head'

import PageWrapper from 'components/globals/pageWrapper'

interface IProps {}

const MyStory: React.FC<IProps> = () => {
  return (
    <PageWrapper>
      <Head>
        <title>My story</title>
      </Head>
      <h1>My Story</h1>
      <div>MyStory</div>
    </PageWrapper>
  )
}

export default MyStory
