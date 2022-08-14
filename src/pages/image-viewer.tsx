import styled from 'styled-components';
import NextImage from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from 'components/header';
import Layout from 'components/layout/Layout';
import logo from 'assets/images/logo_icon.jpg';

import type { NextPage } from 'next';

const ImageViewerBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -56px;
  height: 100vh;
  width: 100%;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const NoImageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
`;

const NoImageText = styled.div`
  font-size: 24px;
  margin-top: 10px;
`;

const ImageViewer: NextPage = () => {
  const [showImage, setShowImage] = useState<boolean>();
  const {
    query: { src },
    back,
  } = useRouter();

  useEffect(() => {
    if (src && typeof src === 'string') {
      setShowImage(true);
    }
  }, [src]);

  return (
    <Layout fullWidth>
      <ImageViewerBox>
        <Header>
          <Header.Left iconType="close" onClick={back} />
        </Header>
        {showImage && src && typeof src === 'string' ? (
          <Image src={src} alt="이미지" onError={() => setShowImage(false)} />
        ) : (
          <NoImageBox>
            <NextImage src={logo} alt="logo" width={200} height={200} />
            <NoImageText>이미지 로드중</NoImageText>
          </NoImageBox>
        )}
      </ImageViewerBox>
    </Layout>
  );
};

export default ImageViewer;
