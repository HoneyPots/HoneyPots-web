import Header from 'components/header';
import CommentInput, { CommentInputProps } from 'components/input/CommentInput';
import { Comment } from 'types/api/common';
import Comments from 'components/comment/Comments';
import Observer from 'components/observer/Observer';
import Layout from 'components/layout/Layout';
import TradePost, { TradePostProps } from '../components/TradePost';
import type { FC } from 'react';

export interface TradeDetailViewProps {
  onHeaderClick: VoidFunction;
  tradePostProps?: TradePostProps;
  comments: Comment[];
  handleObserver: VoidFunction;
  commentInputProps: CommentInputProps;
}

const TradeDetailView: FC<TradeDetailViewProps> = ({
  onHeaderClick,
  tradePostProps,
  commentInputProps,
  comments,
  handleObserver,
}) => (
  <Layout fullWidth>
    <Header>
      <Header.Left iconType="back" onClick={onHeaderClick} />
      <Header.Center title="중고거래" />
    </Header>
    {tradePostProps && (
      <>
        <TradePost {...tradePostProps} full />
        <Comments comments={comments} totalCount={tradePostProps?.commentCount} />
        <Observer onObserve={handleObserver} height="55px" />
        <CommentInput {...commentInputProps} />
      </>
    )}
  </Layout>
);

export default TradeDetailView;
