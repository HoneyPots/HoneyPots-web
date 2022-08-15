import SearchView, { SearchViewProps } from 'screens/common/SearchView';
import EmptyResult from 'components/search/EmptyResult';
import Observer from 'components/observer/Observer';
import { UsedTradePost } from 'types/api/common';
import TradePost, { TradePostProps } from '../components/TradePost';
import type { FC } from 'react';

export interface SearchTradeViewProps {
  searchViewProps: SearchViewProps;
  handleObserver: VoidFunction;
  posts: UsedTradePost[];
  each: (item: UsedTradePost) => TradePostProps;
  keyword: string | null;
}

const SearchTradeView: FC<SearchTradeViewProps> = ({
  searchViewProps,
  each,
  handleObserver,
  posts,
  keyword,
}) => (
  <SearchView {...searchViewProps}>
    {posts.length
      ? posts.map((item) => <TradePost {...each(item)} key={item.postId} />)
      : keyword && <EmptyResult keyword={keyword} />}

    <Observer onObserve={handleObserver} height="55px" />
  </SearchView>
);

export default SearchTradeView;
