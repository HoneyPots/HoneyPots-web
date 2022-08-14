import SearchView, { SearchViewProps } from 'screens/common/SearchView';
import type { FC } from 'react';

export interface GroupBuyingSearchProps {
  searchViewProps: SearchViewProps;
}

const GroupBuyingSearch: FC<GroupBuyingSearchProps> = ({ searchViewProps }) => (
  <SearchView {...searchViewProps} />
);

export default GroupBuyingSearch;
