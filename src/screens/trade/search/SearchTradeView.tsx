import SearchView, { SearchViewProps } from 'screens/common/SearchView';
import type { FC } from 'react';

export interface SearchTradeViewProps {
  searchViewProps: SearchViewProps;
}

const SearchTradeView: FC<SearchTradeViewProps> = ({ searchViewProps }) => (
  <SearchView {...searchViewProps}>
    {/* <TradePost />
    <TradePost />
    <TradePost />
    <TradePost /> */}
  </SearchView>
);

export default SearchTradeView;
