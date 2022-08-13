import Header from 'components/header';
import Layout from 'components/layout/Layout';
import Observer from 'components/observer/Observer';
import TradePost, { TradePostProps } from 'screens/trade/components/TradePost';
import type { FC } from 'react';
import type { UsedTradePost } from 'types/api/common';

export interface MyTradesViewProps {
  onHeaderClick: VoidFunction;
  handleObserver: VoidFunction;
  posts: UsedTradePost[];
  each: (item: UsedTradePost) => TradePostProps;
}

const MyTradesView: FC<MyTradesViewProps> = ({ onHeaderClick, each, handleObserver, posts }) => (
  <Layout>
    <Header>
      <Header.Left iconType="back" onClick={onHeaderClick} />
      <Header.Center title="나의 중고거래" />
    </Header>
    {posts.map((item) => (
      <TradePost {...each(item)} key={item.postId} />
    ))}
    <Observer onObserve={handleObserver} height="55px" />
  </Layout>
);

export default MyTradesView;
