import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  padding: 20px 16px;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 10px;
  margin-right: 8px;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: #191919;
  small {
    color: #131313;
    font-weight: 500;
    display: block;
  }
`;

const Price = styled.div`
  text-align: end;
  font-weight: bold;
  font-size: 18px;
  color: ${(props) => props.theme.color.main};
`;

export interface TradePostProps {
  onClick?: VoidFunction;
  title: string;
  nickname: string;
  cost: string;
  image?: string;
}

const TradePost: React.FC<TradePostProps> = ({ onClick, cost, nickname, title, image }) => (
  <Container onClick={onClick}>
    {image ? (
      <ImageWrapper>
        <Image src={image} layout="fill" alt="thumbnail" />
      </ImageWrapper>
    ) : null}
    <InfoBox>
      <Title>
        <small>{nickname}</small>
        {title}
      </Title>
      <Price>{cost}</Price>
    </InfoBox>
  </Container>
);

export default TradePost;
