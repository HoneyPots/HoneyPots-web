import Header from 'components/header';
import Layout from 'components/layout/Layout';
import type { FC } from 'react';

const HomeView: FC = () => (
  <Layout>
    <Header>
      <Header.Left iconType="close" onClick={() => {}} />
      <Header.Center title="게시글" subtitle="인하대 헤리움" />
      <Header.Right iconType="search" onClick={() => {}} />
    </Header>
  </Layout>
);

export default HomeView;
