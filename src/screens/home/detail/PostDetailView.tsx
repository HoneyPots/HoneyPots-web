import Header from 'components/header';
import Layout from 'components/layout/Layout';
import Post from 'components/post';
import { Comment, PostType } from 'types/api/common';
import Observer from 'components/observer/Observer';
import CommentInput, { CommentInputProps } from 'components/input/CommentInput';
import Comments from 'components/comment/Comments';
import type { FC } from 'react';

export interface PostDetailViewProps {
  post?: PostType;
  comments: Comment[];
  totalComments: number;
  handleObserver: VoidFunction;
  commentInputProps: CommentInputProps;
  onHeaderClick: VoidFunction;
}

const PostDetailView: FC<PostDetailViewProps> = ({
  post,
  comments,
  totalComments,
  handleObserver,
  commentInputProps,
  onHeaderClick,
}) => (
  <Layout fullWidth>
    <Header>
      <Header.Left iconType="back" onClick={onHeaderClick} />
      <Header.Center title="게시글" />
    </Header>
    {post ? <Post {...post} full /> : null}
    <CommentInput {...commentInputProps} />
    <Comments comments={comments} totalCount={totalComments} />
    <Observer onObserve={handleObserver} height="55px" />
  </Layout>
);

export default PostDetailView;
