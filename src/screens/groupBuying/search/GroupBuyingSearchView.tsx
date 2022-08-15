import SearchView, { SearchViewProps } from 'screens/common/SearchView';
import GroupBuyingPost, { GroupBuyingPostProps } from 'components/groupBuying/GroupBuyingPost';
import Observer from 'components/observer/Observer';
import { GroupBuyingPostType } from 'types/api/group-buying';
import type { FC } from 'react';

export interface GroupBuyingSearchProps {
  searchViewProps: SearchViewProps;
  posts: GroupBuyingPostType[];
  each: (item: GroupBuyingPostType) => GroupBuyingPostProps;
  handleObserver: VoidFunction;
}

const GroupBuyingSearch: FC<GroupBuyingSearchProps> = ({
  searchViewProps,
  each,
  handleObserver,
  posts,
}) => (
  <SearchView {...searchViewProps}>
    {posts.map((item) => (
      <GroupBuyingPost {...each(item)} key={item.postId} />
    ))}
    <Observer onObserve={handleObserver} height="55px" />
  </SearchView>
);

export default GroupBuyingSearch;
