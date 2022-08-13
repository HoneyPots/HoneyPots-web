import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import { useDisclosure } from '@chakra-ui/react';
import CommentSvg from 'assets/svgs/CommentSvg';
import { Comment } from 'types/api/common';
import { RootState } from 'libs/store/modules';
import deleteComments from 'api/community/comment/deleteComments';
import Alert from 'components/chakra/Alert';

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

const Writer = styled.div<{ isMe: boolean }>`
  display: flex;
  font-size: 14px;
  color: ${(props) => (props.isMe ? props.theme.color.main : '#313131')};
  font-weight: bold;
  margin-bottom: 6px;
`;

const DeleteButton = styled.div`
  margin-left: 7px;
  font-weight: 600;
  color: #717171;
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
  const userId = useSelector<RootState, number | undefined>(({ user }) => user.userId);
  const queryClient = useQueryClient();
  const [selectedCommentId, setSelectedCommentId] = useState<number>();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const del = useMutation(deleteComments, {
    onSuccess: () => {
      queryClient.invalidateQueries(['/api/comments']);
    },
  });

  return (
    <Container>
      <Title>
        {totalCount}개의 댓글
        <CommentSvg height="18px" width="20px" />
      </Title>
      {comments.map((item) => (
        <CommentWrapper key={item.commentId}>
          <Writer isMe={item.writer.id === userId}>
            {item.writer.nickname}
            {item.writer.id === userId && (
              <DeleteButton
                onClick={() => {
                  setSelectedCommentId(item.commentId);
                  onOpen();
                }}
              >
                삭제
              </DeleteButton>
            )}
          </Writer>
          <Content>{item.content}</Content>
        </CommentWrapper>
      ))}
      {comments.length === 0 && <NoComments>아직 댓글이 없어요</NoComments>}
      <Alert
        body="댓글을 삭제하시겠습니까?"
        header="삭제"
        isOpen={isOpen}
        onClose={onClose}
        onButtonClick={() => {
          if (selectedCommentId) del.mutate({ commentId: selectedCommentId });
          onClose();
        }}
        buttonColor="#DB4437"
        buttonText="삭제"
      />
    </Container>
  );
};

export default Comments;
