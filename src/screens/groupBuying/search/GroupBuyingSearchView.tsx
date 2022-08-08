import SearchView, { SearchViewProps } from 'screens/common/SearchView';
import GroupBuyingPost from 'components/groupBuying/GroupBuyingPost';
import type { FC } from 'react';

export interface GroupBuyingSearchProps {
  onClick: VoidFunction;
  searchViewProps: SearchViewProps;
}

const GroupBuyingSearch: FC<GroupBuyingSearchProps> = ({ onClick, searchViewProps }) => (
  <SearchView {...searchViewProps}>
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
  </SearchView>
);

export default GroupBuyingSearch;
