import styled from 'styled-components';
import Image from 'next/image';
import kakaoLoginImage from 'assets/images/kakao_login_medium_wide.png';

import type { FC, MouseEventHandler } from 'react';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;
`;

const KakaoImageWrapper = styled.div``;

export interface LoginViewProps {
  onKakaoLoginClick: MouseEventHandler<HTMLDivElement>;
}

const LoginView: FC<LoginViewProps> = ({ onKakaoLoginClick }) => (
  <Container>
    <KakaoImageWrapper aria-label="kakao login button" role="button" onClick={onKakaoLoginClick}>
      <Image src={kakaoLoginImage} width={300} height={45} alt="kakao login image" />
    </KakaoImageWrapper>
  </Container>
);

export default LoginView;
