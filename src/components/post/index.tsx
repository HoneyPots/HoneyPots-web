import styled, { css } from 'styled-components';
import useDayjs from 'hooks/useDayjs';
import HeartSvg from 'assets/svgs/HeartSvg';
import CommentSvg from 'assets/svgs/CommentSvg';
import { PostType } from 'types/api/common';
import type { FC } from 'react';

interface Full {
  full?: boolean;
}

const Container = styled.div`
  padding: 16px;
  border-bottom: 4px solid #e9e9e9;
`;

const Title = styled.div<Full>`
  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.65px;
  font-weight: 600;
  color: #191919;
  margin-bottom: 16px;
  ${(props) =>
    !props.full &&
    css`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `}
`;

const Content = styled.p<Full>`
  font-size: 14px;
  line-height: 18px;
  color: #191919;
  letter-spacing: -0.6px;
  margin-bottom: 16px;

  word-break: break-all;
  overflow: hidden;

  ${(props) =>
    !props.full &&
    css`
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    `}
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
  font-size: 13px;
  line-height: 18px;
  letter-spacing: -0.6px;
  color: #535353;
  font-weight: 500;
`;

const SvgWrapper = styled.div`
  :last-child {
    margin-left: 16px;
  }
  margin-right: 8px;
`;

export interface PostProps extends PostType {
  full?: boolean;
  onClick?: VoidFunction;
  onLikeClick?: VoidFunction;
}

const Post: FC<PostProps> = ({
  content,
  commentCount,
  title,
  writer,
  uploadedAt,
  full,
  onClick,
  onLikeClick,
  likeReactionCount,
  isLiked,
}) => {
  const { day } = useDayjs();

  return (
    <Container>
      <Title full={full} onClick={onClick}>
        {title}
      </Title>
      <Content onClick={onClick} full={full}>
        {content}
      </Content>
      <Infos onClick={onClick}>
        <span>{writer.nickname}</span>
        <span>{day(uploadedAt)}</span>
      </Infos>
      <Reactions>
        <SvgWrapper onClick={onLikeClick}>
          {isLiked ? (
            <HeartSvg width="23px" height="18px" fill="#FA383E" stroke="#FA383E" />
          ) : (
            <HeartSvg width="23px" height="18px" fill="none" />
          )}
        </SvgWrapper>
        {Boolean(likeReactionCount) && likeReactionCount}
        {commentCount ? (
          <>
            <SvgWrapper>
              <CommentSvg height="18px" width="20px" color="#717171" />
            </SvgWrapper>
            {commentCount}개의 댓글
          </>
        ) : (
          <div />
        )}
      </Reactions>
    </Container>
  );
};

export default Post;
