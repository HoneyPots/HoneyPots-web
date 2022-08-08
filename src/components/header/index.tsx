import React, { FC } from 'react';
import styled, { DefaultTheme, StyledComponent } from 'styled-components';
import HeaderCenter, { HeaderCenterProps, HeaderCenterWithChildrenProps } from './HeaderCenter';
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

const HeaderInput = styled.input`
  padding: 10px 15px;
  font-size: 14px;
  letter-spacing: -0.4px;
  ::placeholder {
    color: #717171;
  }
  width: 70%;

  border-radius: 4px;
  border: 1px solid #e1e1e1;
  :focus {
    border: ${(props) => props.theme.color.main} solid 1px;
  }
`;

interface HeaderProps {
  children?: React.ReactNode;
}

interface HeaderComponent<P> extends FC<P> {
  Left: FC<HeaderLeftProps | HeaderLeftWithChildrenProps>;
  Center: FC<HeaderCenterProps | HeaderCenterWithChildrenProps>;
  Right: FC<HeaderRightProps | HeaderRightWithChildrenProps>;
  Input: StyledComponent<'input', DefaultTheme>;
}

const Header: HeaderComponent<HeaderProps> = ({ children }) => <Container>{children}</Container>;

Header.Left = HeaderLeft;
Header.Right = HeaderRight;
Header.Center = HeaderCenter;
Header.Input = HeaderInput;

export default Header;
