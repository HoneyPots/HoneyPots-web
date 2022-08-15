import SearchView, { SearchViewProps } from 'screens/common/SearchView';
import Observer from 'components/observer/Observer';
import { UsedTradePost } from 'types/api/common';
import TradePost, { TradePostProps } from '../components/TradePost';
import type { FC } from 'react';

export interface SearchTradeViewProps {
  searchViewProps: SearchViewProps;
  handleObserver: VoidFunction;
  posts: UsedTradePost[];
  each: (item: UsedTradePost) => TradePostProps;
}

const SearchTradeView: FC<SearchTradeViewProps> = ({
  searchViewProps,
  each,
  handleObserver,
  posts,
}) => (
  <SearchView {...searchViewProps}>
    {posts.map((item) => (
      <TradePost {...each(item)} key={item.postId} />
    ))}
    <Observer onObserve={handleObserver} height="55px" />
  </SearchView>
);

export default SearchTradeView;
