import Comments from 'components/comment/Comments';
import GroupBuyingPost from 'components/groupBuying/GroupBuyingPost';
import Header from 'components/header';
import HeaderCenter from 'components/header/HeaderCenter';
import HeaderLeft from 'components/header/HeaderLeft';
import HeaderRight from 'components/header/HeaderRight';
import CommentInput from 'components/input/CommentInput';
import Layout from 'components/layout/Layout';
import type { FC } from 'react';

export interface GroupBuyingDetailViewProps {
  onBackClick: VoidFunction;
}

const GroupBuyingDetailView: FC<GroupBuyingDetailViewProps> = ({ onBackClick }) => (
  <Layout fullWidth>
    <Header>
      <HeaderLeft iconType="back" onClick={onBackClick} />
      <HeaderCenter title="공동구매" subtitle="인하대 헤리움 메트로 타워" />
      <HeaderRight iconType="ellipsis" onClick={() => {}} />
    </Header>
    <GroupBuyingPost
      type="양식"
      content=" 미스터 피자 같이 시켜 드실분 미스터 피자 같이 시켜 드실분 미스터 피자 같이 시켜 드실분 미스터 피자 같이 시켜 드실분 미스터 피자 같이 시켜 드실분 미스터 피자 같이 시켜 드실분 미스터 피자 같이 시켜 드실분 계실까요? 카카오톡 오픈 채팅 팠습니다. 들어오셔서 이야기 하시죵. 미스터 피자 같이 시켜 드실분 미스터 피자 같이 시켜 드실분 미스터 피자 같이 시켜 드실분 미스터 피자 같이 시켜 드실분 미스터 피자 같이 시켜 드실분 미스터 피자 같이 시켜 드실분"
      postId={1}
      title="미스터 피자 같이 시켜 드실분 "
      uploadedAt="2022-8-2"
      writer={{
        id: 0,
        nickname: '헤리움 318호',
      }}
      full
      hasImage
    />
  </Layout>
);

export default GroupBuyingDetailView;
