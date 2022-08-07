import Link from 'next/link';
import Header from 'components/header';
import Layout from 'components/layout/Layout';
import { PostType } from 'types/api/common';
import Post, { PostProps } from 'components/post';
import Observer from 'components/observer/Observer';
import HomeComponents from './components';
import type { FC } from 'react';

export interface HomeViewProps {
  each(post: PostType): PostProps;
  posts: PostType[];
  handleObserver: VoidFunction;
  onSearchClick: VoidFunction;
}

const HomeView: FC<HomeViewProps> = ({ posts, handleObserver, each, onSearchClick }) => (
  <Layout fullWidth>
    <Header>
      <Header.Center title="게시글" subtitle="인하대 헤리움 메트로 타워" />
      <Header.Right iconType="search" onClick={onSearchClick} />
    </Header>
    {posts.map((item, index) => (
      <Post {...each(item)} key={`${index.toString()}`} />
    ))}
    <Link href="/post/add" passHref>
      <HomeComponents.WriteButton>글작성</HomeComponents.WriteButton>
    </Link>
    <Observer onObserve={handleObserver} height="55px" />
  </Layout>
);

export default HomeView;
