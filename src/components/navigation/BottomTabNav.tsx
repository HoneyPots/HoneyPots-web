import Image from 'next/image';
import { FC } from 'react';
import Link from 'next/link';
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

const TabWrapper = styled.a`
  flex: 1 1 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BottomTabNav: FC = () => {
  const { pathname } = useRouter();

  return (
    <Container>
      <Link href="/" passHref prefetch>
        <TabWrapper>
          {pathname === '/' || pathname.startsWith('/post') ? (
            <Image src={home} height={28} width={28} priority />
          ) : (
            <Image src={homeOutline} height={28} width={28} priority />
          )}
        </TabWrapper>
      </Link>
      <Link href="/trade" passHref prefetch>
        <TabWrapper>
          {pathname.startsWith('/trade') ? (
            <Image src={bag} height={24} width={23} priority />
          ) : (
            <Image src={bagOutline} height={24} width={23} priority />
          )}
        </TabWrapper>
      </Link>
      <Link href="/group-buying" passHref prefetch>
        <TabWrapper>
          {pathname.startsWith('/group-buying') ? (
            <Image src={bike} height={24} width={36.2} priority />
          ) : (
            <Image src={bikeOutline} height={24} width={36.2} priority />
          )}
        </TabWrapper>
      </Link>
      <Link href="/me" passHref prefetch>
        <TabWrapper>
          {pathname.startsWith('/me') ? (
            <Image src={user} height={28} width={28} priority />
          ) : (
            <Image src={userOutline} height={28} width={28} priority />
          )}
        </TabWrapper>
      </Link>
    </Container>
  );
};

export default BottomTabNav;
