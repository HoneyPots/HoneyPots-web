import Link from 'next/link';
import Header from 'components/header';
import Layout from 'components/layout/Layout';
import Observer from 'components/observer/Observer';
import TradeComponents from './components';
import TradePost from './components/TradePost';
import type { FC } from 'react';

export interface TradeViewProps {
  handleObserver: VoidFunction;
  onSearchClick: VoidFunction;

  onMockClick: VoidFunction;
}

const TradeView: FC<TradeViewProps> = ({ handleObserver, onSearchClick, onMockClick }) => (
  <Layout fullWidth>
    <Header>
      <Header.Center title="중고거래" subtitle="인하대 헤리움 메트로 타워" />
      <Header.Right iconType="search" onClick={onSearchClick} />
    </Header>
    <TradePost onClick={onMockClick} />
    <TradePost onClick={onMockClick} />
    <TradePost onClick={onMockClick} />
    <TradePost onClick={onMockClick} />
    <TradePost onClick={onMockClick} />
    <TradePost onClick={onMockClick} />
    <TradePost onClick={onMockClick} />
    <TradePost onClick={onMockClick} />
    <TradePost onClick={onMockClick} />
    <TradePost onClick={onMockClick} />
    <TradePost onClick={onMockClick} />
    <TradePost onClick={onMockClick} />
    <Link href="/trade/add" passHref>
      <TradeComponents.WriteButton>글작성</TradeComponents.WriteButton>
    </Link>
    <Observer onObserve={handleObserver} height="55px" />
  </Layout>
);

export default TradeView;
