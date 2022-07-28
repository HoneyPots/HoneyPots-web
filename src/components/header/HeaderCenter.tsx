import { FC } from 'react';
import styled from 'styled-components';

const Container = styled.div<{ hasSubtitle: boolean }>`
  font-size: 17px;
  line-height: 22px;
  font-weight: 700;
  text-align: center;
  color: #191919;
  padding-top: ${(props) => (props.hasSubtitle ? '6px' : '0px')};
  small {
    line-height: 11px;
    display: block;
    font-size: 12px;
  }
`;

export interface HeaderCenterProps {
  title: string;
  subtitle?: string;
}

const HeaderCenter: FC<HeaderCenterProps> = ({ title, subtitle }) => (
  <Container hasSubtitle={Boolean(subtitle)}>
    {title}
    {subtitle && <small>{subtitle}</small>}
  </Container>
);

export default HeaderCenter;
