import styled, { css } from 'styled-components';
import Image from 'next/image';
import { PostType } from 'types/api/common';
import useDayjs from 'hooks/useDayjs';
import CommentSvg from 'assets/svgs/CommentSvg';
import kakaoImageOv from 'assets/images/kakaotalk_sharing_btn_medium_ov.png';
import type { FC } from 'react';

interface Full {
  full?: boolean;
  hasImage?: boolean;
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

const ContentWrapper = styled.div<Full>`
  display: flex;
  flex-direction: ${(props) => (props.full ? 'column' : 'row')};
  gap: 30px 10px;
  margin-bottom: 16px;
`;

const Images = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 10px;
`;

const ImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background-color: #e9e9e9;
  display: inline-block;
`;

const Content = styled.p<Full>`
  font-size: 14px;
  line-height: 18px;
  color: #191919;
  letter-spacing: -0.6px;
  word-break: break-all;
  overflow: hidden;
  flex: 1;
  ${(props) =>
    !props.full &&
    css`
      display: -webkit-box;
      -webkit-line-clamp: ${props.hasImage ? 6 : 3};
      -webkit-box-orient: vertical;
    `}
`;

const Infos = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid #f1f1f1;

  span {
    font-size: 12px;
    font-weight: 600;
    color: #717171;
  }
`;

const Reactions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
`;

const Price = styled.div`
  text-align: end;
  font-weight: bold;
  font-size: 18px;
  color: ${(props) => props.theme.color.main};
`;

const KakaoTalk = styled.a<Full>`
  background-color: #fee500;
  display: flex;
  height: fit-content;
  align-items: center;
  padding: ${(props) => (props.full ? '2px 12px' : '0px')};
  border-radius: 3px;
  span {
    font-size: 12px;
    font-weight: 500;
    color: #000;
    margin-left: 8px;
  }
`;

export interface TradePostProps {
  full?: boolean;
  onClick?: VoidFunction;
  hasImage?: boolean;
  content: string;
  title: string;
  uploadedAt: string;
  nickname: string;
  cost: string;
  kakaoLink?: string;
}

const TradePost: FC<TradePostProps> = ({
  content,
  title,
  nickname,
  uploadedAt,
  full,
  onClick,
  hasImage,
  cost,
  kakaoLink,
}) => {
  const { day } = useDayjs();
  return (
    <Container>
      <Title full={full} onClick={onClick}>
        {title}
      </Title>
      <ContentWrapper full={full} onClick={onClick}>
        {content && (
          <Content hasImage={hasImage} full={full}>
            {content}
          </Content>
        )}
        {hasImage ? (
          <Images>
            {full ? (
              Array(5)
                .fill(0)
                .map((item, index) => <ImageWrapper key={`${index.toString()}`} />)
            ) : (
              <ImageWrapper />
            )}
          </Images>
        ) : null}
      </ContentWrapper>
      <Infos onClick={onClick}>
        <span>{nickname}</span>
        <span>{day(uploadedAt)}</span>
      </Infos>
      <Reactions>
        {kakaoLink ? (
          <KakaoTalk href={kakaoLink} full={full} target="_blank">
            <Image src={kakaoImageOv} width={30} height={30} />
            {full && <span>카카오톡 오픈 채팅</span>}
          </KakaoTalk>
        ) : (
          <div />
        )}
        <Price>{cost}</Price>
      </Reactions>
    </Container>
  );
};

export default TradePost;
