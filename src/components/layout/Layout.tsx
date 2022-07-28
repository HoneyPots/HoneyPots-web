import { FC } from 'react';
import styled from 'styled-components';

const Container = styled.div<{ fullWidth?: boolean }>`
  padding: ${(props) => (props.fullWidth ? ' 56px 0px 52px 0px' : ' 56px 16px 52px 16px')};
  box-sizing: border-box;
`;

interface LayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
}

const Layout: FC<LayoutProps> = ({ children, fullWidth }) => (
  <Container fullWidth={fullWidth}>{children}</Container>
);

export default Layout;
