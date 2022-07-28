import Image from 'next/image';
import { FC } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import bag from 'assets/images/bottomTab/bag.png';
import bagOutline from 'assets/images/bottomTab/bag-outline.png';
import bike from 'assets/images/bottomTab/bike.png';
import bikeOutline from 'assets/images/bottomTab/bike-outline.png';
import home from 'assets/images/bottomTab/home.png';
import homeOutline from 'assets/images/bottomTab/home-outline.png';
import user from 'assets/images/bottomTab/user.png';
import userOutline from 'assets/images/bottomTab/user-outline.png';

const Container = styled.div`
  position: fixed;
  display: flex;
  bottom: 0px;
  left: 0px;
  width: 100vw;
  height: 52px;
  background-color: #fff;
  box-sizing: border-box;
`;

const TabWrapper = styled.div`
  flex: 1 1 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BottomTabNav: FC = () => {
  const { pathname, replace } = useRouter();

  return (
    <Container>
      <TabWrapper onClick={() => replace('/')}>
        <Image src={pathname === '/' ? home : homeOutline} height={28} width={28} />
      </TabWrapper>
      <TabWrapper onClick={() => replace('/trade')}>
        <Image src={pathname === '/trade' ? bag : bagOutline} height={24} width={23} />
      </TabWrapper>
      <TabWrapper onClick={() => replace('/group-buying')}>
        <Image src={pathname === '/group-buying' ? bike : bikeOutline} height={24} width={36.2} />
      </TabWrapper>
      <TabWrapper onClick={() => replace('/me')}>
        <Image src={pathname === '/me' ? user : userOutline} height={28} width={28} />
      </TabWrapper>
    </Container>
  );
};

export default BottomTabNav;
