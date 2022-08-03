import Header from 'components/header';
import Layout from 'components/layout/Layout';
import Post from 'components/post';
import { PostType } from 'types/api/common';
import CommentInput from 'components/input/CommentInput';
import type { FC } from 'react';

export interface PostDetailViewProps {
  post?: PostType;
}

const PostDetailView: FC<PostDetailViewProps> = ({ post }) => (
  <Layout fullWidth>
    <Header>
      <Header.Left iconType="back" onClick={() => {}} />
      <Header.Center title="게시글" />
    </Header>
    {post ? <Post {...post} full /> : null}
    <CommentInput onChange={() => {}} onSubmitClick={() => {}} value="" />
  </Layout>
);

export default PostDetailView;
