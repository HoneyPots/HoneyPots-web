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
  handleObserver: VoidFunction;
  commentInputProps: CommentInputProps;
  onHeaderClick: VoidFunction;
}

const PostDetailView: FC<PostDetailViewProps> = ({
  post,
  comments,
  handleObserver,
  commentInputProps,
  onHeaderClick,
}) => (
  <Layout fullWidth>
    <Header>
      <Header.Left iconType="back" onClick={onHeaderClick} />
      <Header.Center title="게시글" />
    </Header>
    {post ? (
      <>
        <Post {...post} full />
        <CommentInput {...commentInputProps} />
        <Comments comments={comments} totalCount={post.commentCount} />
        <Observer onObserve={handleObserver} height="55px" />
      </>
    ) : null}
  </Layout>
);

export default PostDetailView;
