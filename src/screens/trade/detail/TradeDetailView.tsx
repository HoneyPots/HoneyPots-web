import Header from 'components/header';
import CommentInput from 'components/input/CommentInput';
import Layout from 'components/layout/Layout';
import Comments from 'components/comment/Comments';
import TradePost from '../components/TradePost';
import type { FC } from 'react';

const makeComments = (name: string, content: string) => ({
  commentId: content.length,
  content,
  createdAt: '',
  lastModifiedAt: '',
  postId: 0,
  writer: { id: 0, nickname: name },
});

export interface TradeDetailViewProps {
  onHeaderClick: VoidFunction;
}

const TradeDetailView: FC<TradeDetailViewProps> = ({ onHeaderClick }) => (
  <Layout fullWidth>
    <Header>
      <Header.Left iconType="back" onClick={onHeaderClick} />
      <Header.Center title="중고거래" />
    </Header>
    <TradePost
      content="뻘건우산 판다고요!"
      title="빠바빠빠 빨간맛!! 궁금해 허니~"
      uploadedAt="2022-8-2"
      nickname="test"
      hasImage
      cost="9,000원"
      full
    />
    <Comments
      comments={[
        makeComments('헤리움 12', '저 사고 싶습니다'),
        makeComments('헤리움 379', '음 저도요!'),
      ]}
      totalCount={2}
    />
    <CommentInput onChange={() => {}} onSubmitClick={() => {}} value="비활성화" />
  </Layout>
);

export default TradeDetailView;
