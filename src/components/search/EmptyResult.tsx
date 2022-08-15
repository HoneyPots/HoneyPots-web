import { FC } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 30vh;
`;

const Text = styled.div`
  font-size: 15px;
  font-weight: 400;
  color: #191919;
  b {
    font-size: 16px;
    font-weight: 500;
    color: #2a6df2;
  }
  max-width: 80%;
  text-align: center;
  div {
    display: inline-block;
  }
`;

interface EmptyResultProps {
  keyword: string;
}

const EmptyResult: FC<EmptyResultProps> = ({ keyword }) => (
  <Container>
    <Text>
      <b>{keyword}</b>
      <div>에 대한 검색 결과가 없어요</div>
    </Text>
  </Container>
);

export default EmptyResult;
