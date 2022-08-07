import { FC, PropsWithChildren } from 'react';
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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HeaderCenterWithChildrenProps extends PropsWithChildren {}

export interface HeaderCenterProps {
  title: string;
  subtitle?: string;
}

const isChildrenType = (
  props: HeaderCenterProps | HeaderCenterWithChildrenProps,
): props is HeaderCenterWithChildrenProps => 'children' in props;

const HeaderCenter: FC<HeaderCenterProps | HeaderCenterWithChildrenProps> = (props) => {
  if (isChildrenType(props)) {
    const { children } = props;
    return <Container hasSubtitle={false}>{children}</Container>;
  }

  const { title, subtitle } = props;

  return (
    <Container hasSubtitle={Boolean(subtitle)}>
      {title}
      {subtitle && <small>{subtitle}</small>}
    </Container>
  );
};

export default HeaderCenter;
