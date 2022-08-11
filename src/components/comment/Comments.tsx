import { FC } from 'react';
import styled from 'styled-components';
import CommentSvg from 'assets/svgs/CommentSvg';
import { Comment } from 'types/api/common';

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.div`
  display: flex;

  align-items: center;
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 20px;
  svg {
    margin-left: 8px;
  }
`;

const Writer = styled.div`
  font-size: 14px;
  color: #313131;
  font-weight: bold;
  margin-bottom: 6px;
`;

const Content = styled.div`
  font-size: 14px;
  color: #191919;
  margin-bottom: 16px;
  margin-left: 8px;
`;

const CommentWrapper = styled.div``;

const NoComments = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #717171;
  text-align: center;
`;

interface CommentsProps {
  comments: Comment[];
  totalCount: number;
}

const Comments: FC<CommentsProps> = ({ comments, totalCount }) => {
  const b = 0;
  return (
    <Container>
      <Title>
        {totalCount}개의 댓글
        <CommentSvg height="18px" width="20px" />
      </Title>
      {comments.map((item) => (
        <CommentWrapper key={item.commentId}>
          <Writer>{item.writer.nickname}</Writer>
          <Content>{item.content}</Content>
        </CommentWrapper>
      ))}
      {comments.length === 0 && <NoComments>아직 댓글이 없어요</NoComments>}
    </Container>
  );
};

export default Comments;
