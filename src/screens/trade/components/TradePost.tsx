import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import image from 'assets/images/um.jpeg';

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

const TradePost: React.FC = () => (
  <Container>
    <ImageWrapper>
      <Image src={image} layout="fill" />
    </ImageWrapper>
    <InfoBox>
      <Title>
        <small>101동 익명</small>
        빨간 우산 무료 나눔 합니당
      </Title>
      <Price>무료나눔</Price>
    </InfoBox>
  </Container>
);

export default TradePost;
