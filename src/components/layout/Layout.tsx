import { FC } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 0px 16px;
  box-sizing: border-box;
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => <Container>{children}</Container>;

export default Layout;
