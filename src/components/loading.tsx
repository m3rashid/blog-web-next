import React from 'react';
import { Group, Loader } from '@mantine/core';

import PageWrapper from 'components/globals/pageWrapper';

interface IProps {}

const Loading: React.FC<IProps> = () => {
  return (
    <PageWrapper>
      <Group style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Loader />
      </Group>
    </PageWrapper>
  );
};

export default Loading;
