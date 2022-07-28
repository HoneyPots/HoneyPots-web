import Header from 'components/header';
import Layout from 'components/layout/Layout';
import Post from 'components/post';
import type { FC } from 'react';

const HomeView: FC = () => (
  <Layout fullWidth>
    <Header>
      <Header.Center title="게시글" subtitle="인하대 헤리움 메트로 타워" />
      <Header.Right iconType="search" onClick={() => {}} />
    </Header>
    <Post />
    <Post />
    <Post />
    <Post />
  </Layout>
);

export default HomeView;
