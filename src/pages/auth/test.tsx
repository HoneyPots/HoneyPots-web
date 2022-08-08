import { Button } from '@chakra-ui/react';
import { NextPage } from 'next';
import { InputLabel } from 'components/input';
import Layout from 'components/layout/Layout';
import axios from 'libs/axios';

const RefreshTest: NextPage = () => {
  const onClick = () => {
    axios.post('/api/auth/token', { grantType: 'refresh_token' });
  };

  return (
    <Layout>
      <InputLabel>로그인 테스트</InputLabel>
      <Button onClick={onClick}>토큰 재발급</Button>
    </Layout>
  );
};

export default RefreshTest;
