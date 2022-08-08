import Header from 'components/header';
import Layout from 'components/layout/Layout';
import { PostType } from 'types/api/common';
import Observer from 'components/observer/Observer';
import Post, { PostProps } from 'components/post';
import type { FC } from 'react';

export interface MyPostsViewProps {
  onHeaderClick: VoidFunction;
  posts: PostType[];
  each(item: PostType): PostProps;
  handleObserver: VoidFunction;
}

const MyPostsView: FC<MyPostsViewProps> = ({ onHeaderClick, each, posts, handleObserver }) => (
  <Layout>
    <Header>
      <Header.Left iconType="back" onClick={onHeaderClick} />
      <Header.Center title="나의 게시글" />
    </Header>
    {posts.map((item, index) => (
      <Post {...each(item)} key={`${index.toString()}`} />
    ))}
    <Observer onObserve={handleObserver} height="55px" />
  </Layout>
);

export default MyPostsView;
