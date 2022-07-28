import styled from 'styled-components';
import HeartSvg from 'assets/svgs/HeartSvg';
import CommentSvg from 'assets/svgs/CommentSvg';
import type { FC } from 'react';

const Container = styled.div`
  padding: 16px;
  border-bottom: 4px solid #e9e9e9;
`;

const Title = styled.div`
  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.65px;
  font-weight: 600;
  color: #191919;
  margin-bottom: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Content = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  font-size: 14px;
  line-height: 18px;
  color: #191919;
  letter-spacing: -0.6px;

  margin-bottom: 16px;
`;

const Infos = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid #f1f1f1;
  span {
    font-size: 14px;
    font-weight: 600;
    color: #717171;
  }
`;

const Reactions = styled.div`
  display: flex;
  margin-top: 12px;
  align-items: center;
  font-size: 13px;
  line-height: 18px;
  letter-spacing: -0.6px;
  color: #535353;
  font-weight: 500;
  align-items: center;
  svg {
    :first-child {
      margin-right: 16px;
    }
    margin-right: 8px;
  }
`;

export interface PostProps {
  examples?: any;
}

const Post: FC<PostProps> = () => (
  <Container>
    <Title>
      [공지] 잘부탁 드립니다 잘부탁 드립니다 잘부탁 드립니다 잘부탁 드립니다 잘부탁 드립니다
    </Title>
    <Content>
      용현5동 동사무소에 체력단련실 있나요??? 러닝머신 뛰고 싶은데 ㅜ ㅜ 아님 용현2동 동사무소에
      있을까요? 아시는분들은 댓글에 알려주시 면 감사하겠습니다 ㅠ^ㅠ… 용현5동 동사무소에 체력단련실
      있나요??? 러닝머신 뛰고 싶은데 ㅜ ㅜ 아님 용현2동 동사무소에 있을까요? 아시는분들은 댓글에
      알려주시 면 감사하겠습니다 ㅠ^ㅠ… 용현5동 동사무소에 체력단련실 있나요??? 러닝머신 뛰고 싶은데
      ㅜ ㅜ 아님 용현2동 동사무소에 있을까요? 아시는분들은 댓글에 알려주시 면 감사하겠습니다 ㅠ^ㅠ…
      용현5동 동사무소에 체력단련실 있나요??? 러닝머신 뛰고 싶은데 ㅜ ㅜ 아님 용현2동 동사무소에
      있을까요? 아시는분들은 댓글에 알려주시 면 감사하겠습니다 ㅠ^ㅠ… 용현5동 동사무소에 체력단련실
      있나요??? 러닝머신 뛰고 싶은데 ㅜ ㅜ 아님 용현2동 동사무소에 있을까요? 아시는분들은 댓글에
      알려주시 면 감사하겠습니다 ㅠ^ㅠ…
    </Content>
    <Infos>
      <span>꿀단지 서비스</span>
      <span>30분전</span>
    </Infos>
    <Reactions>
      <HeartSvg width="23px" height="18px" fill="none" />
      <CommentSvg height="18px" width="20px" />
      8개의 댓글
    </Reactions>
  </Container>
);

export default Post;
