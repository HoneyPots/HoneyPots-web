import { FC } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import ellipsis from 'assets/images/header/ellipsis-vertical.png';
import search from 'assets/images/header/search.png';

const Container = styled.div`
  position: absolute;
  right: 16px;
`;

export interface HeaderRightWithChildrenProps {
  children: React.ReactNode;
}

export interface HeaderRightProps {
  iconType: 'ellipsis' | 'search';
  onClick: VoidFunction;
}

const isChildrenType = (
  props: HeaderRightProps | HeaderRightWithChildrenProps,
): props is HeaderRightWithChildrenProps => 'children' in props;

const HeaderRight: FC<HeaderRightProps | HeaderRightWithChildrenProps> = (props) => {
  if (isChildrenType(props)) {
    const { children } = props;
    return <Container>{children}</Container>;
  }

  const { iconType, onClick } = props;

  return (
    <Container onClick={onClick}>
      {iconType === 'ellipsis' ? (
        <Image src={ellipsis} width={4} height={24} />
      ) : (
        <Image src={search} width={28} height={28} />
      )}
    </Container>
  );
};

export default HeaderRight;
