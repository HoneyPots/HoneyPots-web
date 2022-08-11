import Link from 'next/link';
import Header from 'components/header';
import Layout from 'components/layout/Layout';
import { UsedTradePost } from 'types/api/common';
import Observer from 'components/observer/Observer';
import TradeComponents from './components';
import TradePost, { TradePostProps } from './components/TradePost';
import type { FC } from 'react';

export interface TradeViewProps {
  handleObserver: VoidFunction;
  onSearchClick: VoidFunction;
  posts: UsedTradePost[];
  each: (item: UsedTradePost) => TradePostProps;
}

const TradeView: FC<TradeViewProps> = ({ handleObserver, onSearchClick, posts, each }) => (
  <Layout fullWidth>
    <Header>
      <Header.Center title="중고거래" subtitle="인하대 헤리움 메트로 타워" />
      <Header.Right iconType="search" onClick={onSearchClick} />
    </Header>
    {posts.map((item) => (
      <TradePost {...each(item)} key={item.postId} />
    ))}
    <Link href="/trade/add" passHref>
      <TradeComponents.WriteButton>글작성</TradeComponents.WriteButton>
    </Link>
    <Observer onObserve={handleObserver} height="55px" />
  </Layout>
);

export default TradeView;
