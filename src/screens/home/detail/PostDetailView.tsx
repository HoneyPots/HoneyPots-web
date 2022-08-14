import Header from 'components/header';
import Layout from 'components/layout/Layout';
import Post, { PostProps } from 'components/post';
import { Comment } from 'types/api/common';
import Observer from 'components/observer/Observer';
import { MenuItemType } from 'components/header/HeaderRight';
import Alert, { AlertProps } from 'components/chakra/Alert';
import CommentInput, { CommentInputProps } from 'components/input/CommentInput';
import Comments from 'components/comment/Comments';
import type { FC } from 'react';

export interface PostDetailViewProps {
  post?: PostProps;
  comments: Comment[];
  handleObserver: VoidFunction;
  commentInputProps: CommentInputProps;
  onHeaderClick: VoidFunction;
  menuLists: MenuItemType[];
  alertProps: AlertProps;
}

const PostDetailView: FC<PostDetailViewProps> = ({
  post,
  comments,
  handleObserver,
  commentInputProps,
  onHeaderClick,
  menuLists,
  alertProps,
}) => (
  <Layout fullWidth>
    <Header>
      <Header.Left iconType="back" onClick={onHeaderClick} />
      <Header.Center title="게시글" />
      <Header.Right iconType="ellipsis" menuItemlist={menuLists} />
    </Header>
    {post ? (
      <>
        <Post {...post} full />
        <Comments comments={comments} totalCount={post.commentCount} />
        <Observer onObserve={handleObserver} height="55px" />
        <CommentInput {...commentInputProps} />
      </>
    ) : null}
    <Alert {...alertProps} />
  </Layout>
);

export default PostDetailView;
