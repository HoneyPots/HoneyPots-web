import React, { FC } from 'react';
import styled from 'styled-components';
import HeaderCenter, { HeaderCenterProps } from './HeaderCenter';
import HeaderLeft, { HeaderLeftProps, HeaderLeftWithChildrenProps } from './HeaderLeft';
import HeaderRight, { HeaderRightProps, HeaderRightWithChildrenProps } from './HeaderRight';

const Container = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 56px;
  box-sizing: border-box;
  padding: 0px 16px;
  background-color: #fff;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface HeaderProps {
  children?: React.ReactNode;
}

interface HeaderComponent<P> extends FC<P> {
  Left: FC<HeaderLeftProps | HeaderLeftWithChildrenProps>;
  Center: FC<HeaderCenterProps>;
  Right: FC<HeaderRightProps | HeaderRightWithChildrenProps>;
}

const Header: HeaderComponent<HeaderProps> = ({ children }) => <Container>{children}</Container>;

Header.Left = HeaderLeft;
Header.Right = HeaderRight;
Header.Center = HeaderCenter;
export default Header;
