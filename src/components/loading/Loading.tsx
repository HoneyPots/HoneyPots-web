import styled, { keyframes } from 'styled-components';
import Image from 'next/image';
import Logo from 'assets/images/logo.png';

import type { FC } from 'react';

const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
`;

const LogoWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
`;

const loadingKeyframe = keyframes`
  0%,
  80%,
  100% {
    box-shadow: 0 10px 0 -6px;
  }
  40% {
    box-shadow: 0 10px 0 0;
  }
`;

const Loader = styled.div`
  animation-delay: -0.16s;
  color: ${({ theme }) => theme.color.main};
  font-size: 5px;
  position: relative;
  text-indent: -9999em;
  transform: translateZ(0);

  &,
  &::after,
  &::before {
    border-radius: 50%;
    width: 10px;
    height: 10px;
    animation-fill-mode: both;
    animation: ${loadingKeyframe} 1.8s infinite ease-in-out;
  }

  &::after,
  &::before {
    content: '';
    position: absolute;
    top: 0;
  }

  &::after {
    left: 3.5em;
  }

  &::before {
    left: -3.5em;
    animation-delay: -0.32s;
  }
`;

const Loading: FC = () => (
  <LoadingContainer>
    <LogoWrapper>
      <Image src={Logo} layout="fill" alt="logo" priority />
    </LogoWrapper>
    <Loader />
  </LoadingContainer>
);

export default Loading;
