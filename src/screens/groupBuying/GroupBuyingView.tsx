import Link from 'next/link';
import GroupBuyingPost, { GroupBuyingPostProps } from 'components/groupBuying/GroupBuyingPost';
import Header from 'components/header';
import HeaderCenter from 'components/header/HeaderCenter';
import HeaderRight from 'components/header/HeaderRight';
import Observer from 'components/observer/Observer';
import { GroupBuyingPostType } from 'types/api/group-buying';
import Layout from 'components/layout/Layout';
import GroupBuyingComponents from './components';
import type { FC } from 'react';

export interface GroupBuyingViewProps {
  onSearchClick: VoidFunction;
  posts: GroupBuyingPostType[];
  each: (item: GroupBuyingPostType) => GroupBuyingPostProps;
  handleObserver: VoidFunction;
}

const GroupBuyingView: FC<GroupBuyingViewProps> = ({
  onSearchClick,
  each,
  posts,
  handleObserver,
}) => (
  <Layout fullWidth>
    <Header>
      <HeaderCenter title="공동구매" subtitle="인하대 헤리움 메트로 타워" />
      <HeaderRight iconType="search" onClick={onSearchClick} />
    </Header>
    {posts.map((item) => (
      <GroupBuyingPost {...each(item)} key={item.postId} />
    ))}
    <Observer onObserve={handleObserver} height="55px" />
    <Link href="/group-buying/add" passHref>
      <GroupBuyingComponents.WriteButton>글작성</GroupBuyingComponents.WriteButton>
    </Link>
  </Layout>
);

export default GroupBuyingView;
