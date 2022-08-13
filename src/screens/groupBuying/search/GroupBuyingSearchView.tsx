import SearchView, { SearchViewProps } from 'screens/common/SearchView';
import GroupBuyingPost from 'components/groupBuying/GroupBuyingPost';
import type { FC } from 'react';

export interface GroupBuyingSearchProps {
  onClick: VoidFunction;
  searchViewProps: SearchViewProps;
}

const GroupBuyingSearch: FC<GroupBuyingSearchProps> = ({ onClick, searchViewProps }) => (
  <SearchView {...searchViewProps} />
);

export default GroupBuyingSearch;
