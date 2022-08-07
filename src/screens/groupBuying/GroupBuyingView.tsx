import Link from 'next/link';
import GroupBuyingPost from 'components/groupBuying/GroupBuyingPost';
import Header from 'components/header';
import HeaderCenter from 'components/header/HeaderCenter';
import HeaderRight from 'components/header/HeaderRight';
import Layout from 'components/layout/Layout';
import GroupBuyingComponents from './components';
import type { FC } from 'react';

export interface GroupBuyingViewProps {
  onClick: VoidFunction;
  onSearchClick: VoidFunction;
}

const GroupBuyingView: FC<GroupBuyingViewProps> = ({ onClick, onSearchClick }) => (
  <Layout fullWidth>
    <Header>
      <HeaderCenter title="공동구매" subtitle="인하대 헤리움 메트로 타워" />
      <HeaderRight iconType="search" onClick={onSearchClick} />
    </Header>

    <GroupBuyingPost
      type="중식"
      title="짜장면 같이 드실분? "
      postId={1}
      content="짜장면 같이 드실래요? 카톡 주세요"
      uploadedAt={new Date('2022-7-31').toString()}
      writer={{
        id: 0,
        nickname: '헤리움 318호',
      }}
      onClick={onClick}
    />
    <GroupBuyingPost
      type="한식"
      title="동전집 덮밥 같이 시키실 분 계신가용?"
      postId={1}
      content="지금 5팀 이상 주문 시 무료 배달 이벤트 하고 있어서 모이면 바로 주문할께요! 톡 주세용"
      uploadedAt={new Date('2022-7-31').toString()}
      writer={{
        id: 0,
        nickname: '익명',
      }}
      hasImage
      onClick={onClick}
    />
    <GroupBuyingPost
      type="일식"
      content=""
      postId={1}
      title="미락 초밥 같이 시키실분"
      uploadedAt={new Date('2022-7-31').toString()}
      writer={{
        id: 0,
        nickname: '헤리움 312호',
      }}
      hasImage
      onClick={onClick}
    />
    <GroupBuyingPost
      type="양식"
      content="미스터 피자 같이 시켜 드실분 계실까요 카카오톡 오픈 채팅 팠습니다. 들어오셔서 이야기 하시죵. 미스터 피자 같이 시켜 드실분 미스터 피자 같이 시켜 드실분 미스터 피자 같이 시켜 드실분 미스터 피자 같이 시켜 드실분 미스터 피자 같이 시켜 드실분 미스터 피자 같이 시켜 드실분 미스터 피자 같이 시켜 드실분 계실까요? 카카오톡 오픈 채팅 팠습니다. 들어오셔서 이야기 하시죵. 미스터 피자 같이 시켜 드실분 미스터 피자 같이 시켜 드실분 미스터 피자 같이 시켜 드실분 미스터 피자 같이 시켜 드실분 미스터 피자 같이 시켜 드실분 미스터 피자 같이 시켜 드실분"
      postId={1}
      title="미스터 피자 같이 시켜 드실분 "
      uploadedAt={new Date('2022-7-31').toString()}
      writer={{
        id: 0,
        nickname: '헤리움 318호',
      }}
      hasImage
      onClick={onClick}
    />
    <GroupBuyingPost
      type="기타"
      title="타코벨 같이 드실분"
      postId={1}
      content="맥시코 타코 여기 존맛이에용"
      uploadedAt={new Date('2022-7-31').toString()}
      writer={{
        id: 0,
        nickname: '헤리움 318호',
      }}
      onClick={onClick}
    />
    <GroupBuyingPost
      type="한식"
      title="동전집 덮밥 같이 시키실 분 계신가용?"
      postId={1}
      content="지금 5팀 이상 주문 시 무료 배달 이벤트 하고 있어서 모이면 바로 주문할께요! 톡 주세용"
      uploadedAt={new Date('2022-7-31').toString()}
      writer={{
        id: 0,
        nickname: '익명',
      }}
      hasImage
      onClick={onClick}
    />
    <Link href="/group-buying/add" passHref>
      <GroupBuyingComponents.WriteButton>글작성</GroupBuyingComponents.WriteButton>
    </Link>
  </Layout>
);

export default GroupBuyingView;
