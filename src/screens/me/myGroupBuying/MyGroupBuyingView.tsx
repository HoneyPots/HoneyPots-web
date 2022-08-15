import GroupBuyingPost, { GroupBuyingPostProps } from 'components/groupBuying/GroupBuyingPost';
import Header from 'components/header';
import { GroupBuyingPostType } from 'types/api/group-buying';
import Layout from 'components/layout/Layout';
import Observer from 'components/observer/Observer';
import type { FC } from 'react';

export interface MyGroupBuyingViewProps {
  onHeaderClick: VoidFunction;
  posts: GroupBuyingPostType[];
  each: (item: GroupBuyingPostType) => GroupBuyingPostProps;
  handleObserver: VoidFunction;
}

const MyGroupBuyingView: FC<MyGroupBuyingViewProps> = ({
  onHeaderClick,
  each,
  handleObserver,
  posts,
}) => (
  <Layout fullWidth>
    <Header>
      <Header.Left iconType="back" onClick={onHeaderClick} />
      <Header.Center title="나의 공동구매" />
    </Header>
    {posts.map((item) => (
      <GroupBuyingPost {...each(item)} key={item.postId} />
    ))}
    <Observer onObserve={handleObserver} height="55px" />
  </Layout>
);

export default MyGroupBuyingView;
