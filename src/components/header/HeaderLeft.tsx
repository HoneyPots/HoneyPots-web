import { FC } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import back from 'assets/images/header/back.png';
import close from 'assets/images/header/close.png';

const Container = styled.div`
  position: absolute;
  left: 16px;
`;

export interface HeaderLeftWithChildrenProps {
  children: React.ReactNode;
}

export interface HeaderLeftProps {
  iconType: 'back' | 'close';
  onClick: VoidFunction;
}

const isChildrenType = (
  props: HeaderLeftProps | HeaderLeftWithChildrenProps,
): props is HeaderLeftWithChildrenProps => 'children' in props;

const HeaderLeft: FC<HeaderLeftProps | HeaderLeftWithChildrenProps> = (props) => {
  if (isChildrenType(props)) {
    const { children } = props;
    return <Container>{children}</Container>;
  }

  const { iconType, onClick } = props;

  return (
    <Container onClick={onClick}>
      {iconType === 'back' ? (
        <Image src={back} width={10} height={18} />
      ) : (
        <Image src={close} width={18} height={18} />
      )}
    </Container>
  );
};

export default HeaderLeft;
