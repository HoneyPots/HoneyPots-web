import SearchView, { SearchViewProps } from 'screens/common/SearchView';
import GroupBuyingPost, { GroupBuyingPostProps } from 'components/groupBuying/GroupBuyingPost';
import EmptyResult from 'components/search/EmptyResult';
import Observer from 'components/observer/Observer';
import { GroupBuyingPostType } from 'types/api/group-buying';
import type { FC } from 'react';

export interface GroupBuyingSearchProps {
  searchViewProps: SearchViewProps;
  posts: GroupBuyingPostType[];
  each: (item: GroupBuyingPostType) => GroupBuyingPostProps;
  handleObserver: VoidFunction;
  keyword: string | null;
}

const GroupBuyingSearch: FC<GroupBuyingSearchProps> = ({
  searchViewProps,
  each,
  handleObserver,
  posts,
  keyword,
}) => (
  <SearchView {...searchViewProps}>
    {posts.length
      ? posts.map((item) => <GroupBuyingPost {...each(item)} key={item.postId} />)
      : keyword && <EmptyResult keyword={keyword} />}
    <Observer onObserve={handleObserver} height="55px" />
  </SearchView>
);

export default GroupBuyingSearch;
