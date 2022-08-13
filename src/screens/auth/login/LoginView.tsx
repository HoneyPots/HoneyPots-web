import styled from 'styled-components';
import Image from 'next/image';
import logoimg from 'assets/images/logo.png';
import kakaoLoginImage from 'assets/images/kakao_login_medium_wide.png';

import type { FC, MouseEventHandler } from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;
`;

const KakaoImageWrapper = styled.div`
  margin-bottom: 200px;
`;

export interface LoginViewProps {
  onKakaoLoginClick: MouseEventHandler<HTMLDivElement>;
}

const LoginView: FC<LoginViewProps> = ({ onKakaoLoginClick }) => (
  <Container>
    <Image priority src={logoimg} height={300} width={300} />
    <KakaoImageWrapper aria-label="kakao login button" role="button" onClick={onKakaoLoginClick}>
      <Image src={kakaoLoginImage} width={300} height={45} alt="kakao login image" />
    </KakaoImageWrapper>
  </Container>
);

export default LoginView;
