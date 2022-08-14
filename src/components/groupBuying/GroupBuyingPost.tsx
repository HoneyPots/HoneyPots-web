import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
import Image from 'next/image';
import { FC, useMemo } from 'react';
import { GroupBuyingPostType } from 'types/api/group-buying';
import useDayjs from 'hooks/useDayjs';
import kakaoImageOv from 'assets/images/kakaotalk_sharing_btn_medium_ov.png';

interface Full {
  full?: boolean;
  hasImage?: boolean;
}

type BadgeType = '양식' | '일식' | '중식' | '한식' | '기타';

const Container = styled.div`
  padding: 16px;
  border-bottom: 4px solid #e9e9e9;
`;

const Title = styled.div<Full>`
  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.65px;
  font-weight: 600;
  color: #191919;
  margin-bottom: 16px;
  ${(props) =>
    !props.full &&
    css`
      white-space: nowrap;

      overflow: hidden;
      text-overflow: ellipsis;
    `}
`;

const Badge = styled.div<{ type: BadgeType }>`
  border-radius: 30px;
  padding: 2px 8px;
  height: fit-content;
  width: fit-content;
  word-break: keep-all;
  margin-right: 8px;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #fff;
  background-color: ${(props) => {
    switch (props.type) {
      case '기타':
        return '#5D5D5D';
      case '양식':
        return '#EB8A37';
      case '일식':
        return '#3775EB';
      case '중식':
        return props.theme.color.red;
      case '한식':
        return '#0B6018';
      default:
        return '#fff';
    }
  }};
`;

const ContentWrapper = styled.div<Full>`
  display: flex;
  flex-direction: ${(props) => (props.full ? 'column' : 'row')};
  gap: 30px 10px;
  margin-bottom: 16px;
`;

const Images = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 10px;
`;

const ImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background-color: #e9e9e9;
  display: inline-block;
`;

const Content = styled.p<Full>`
  font-size: 14px;
  line-height: 18px;
  color: #191919;
  letter-spacing: -0.6px;
  word-break: break-all;
  overflow: hidden;
  flex: 1;
  ${(props) =>
    !props.full &&
    css`
      display: -webkit-box;
      -webkit-line-clamp: ${props.hasImage ? 6 : 3};
      -webkit-box-orient: vertical;
    `}
`;

const Infos = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid #f1f1f1;

  span {
    font-size: 12px;
    font-weight: 600;
    color: #717171;
  }
`;

const Reactions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  font-size: 13px;
  line-height: 18px;
  letter-spacing: -0.6px;
  color: #535353;
  font-weight: 500;
`;

const TimeCount = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: blue;
  small {
    font-size: 14px;
  }
`;

const KakaoTalk = styled.a<Full>`
  background-color: #fee500;
  display: flex;
  height: fit-content;
  align-items: center;
  padding: ${(props) => (props.full ? '2px 12px' : '0px')};
  border-radius: 3px;
  span {
    font-size: 12px;
    font-weight: 500;
    color: #000;
    margin-left: 8px;
  }
`;

const Dead = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => props.theme.color.red};
`;

export interface GroupBuyingPostProps extends GroupBuyingPostType {
  full?: boolean;
  onClick?: VoidFunction;
}

const GroupBuyingPost: FC<GroupBuyingPostProps> = ({
  content,
  title,
  writer,
  uploadedAt,
  full,
  onClick,
  category,
  attachedFiles,
  thumbnailImageFile,
  chatRoomLink,
  deadline,
  groupBuyingStatus,
}) => {
  const { day, dayjs } = useDayjs();
  const router = useRouter();

  const diff = useMemo(() => {
    const now = new Date();
    const oneMin = 1000 * 60;

    const timezoneOffset = new Date().getTimezoneOffset() * oneMin;
    return Math.floor((dayjs(deadline).valueOf() - now.getTime() - timezoneOffset) / 1000);
  }, [dayjs, deadline]);

  const timeLeft = useMemo(() => {
    const hour = Math.floor(diff / 3600);
    const min = Math.floor((diff - hour * 3600) / 60);
    return `${hour}:${min}`;
  }, [diff]);
  return (
    <Container>
      <Badge type={category as BadgeType}>{category}</Badge>
      <Title full={full} onClick={onClick}>
        {title}
      </Title>
      <ContentWrapper full={full} onClick={onClick}>
        {content && (
          <Content hasImage={Boolean(attachedFiles)} full={full}>
            {content}
          </Content>
        )}
        {attachedFiles && full && (
          <Images>
            {attachedFiles.map((item, index) => (
              <ImageWrapper
                key={`image ${index.toString()}`}
                onClick={() => router.push(`image-viewer?src=${item.fileLocationUrl}`)}
              >
                <Image src={item.fileLocationUrl} layout="fill" objectFit="cover" />
              </ImageWrapper>
            ))}
          </Images>
        )}
        {thumbnailImageFile && !full && (
          <ImageWrapper>
            <Image src={thumbnailImageFile?.fileLocationUrl} layout="fill" objectFit="cover" />
          </ImageWrapper>
        )}
      </ContentWrapper>
      <Infos onClick={onClick}>
        <span>{writer.nickname}</span>
        <span>{day(uploadedAt)}</span>
      </Infos>
      <Reactions>
        <KakaoTalk full={full} href={chatRoomLink}>
          <Image src={kakaoImageOv} width={30} height={30} />
          {full && <span>카카오톡 오픈 채팅</span>}
        </KakaoTalk>
        <TimeCount>
          {diff > 0 && groupBuyingStatus === 'ONGOING' ? (
            <>
              {timeLeft}
              <small>후 종료</small>
            </>
          ) : (
            <Dead>종료됨</Dead>
          )}
        </TimeCount>
      </Reactions>
    </Container>
  );
};

export default GroupBuyingPost;
