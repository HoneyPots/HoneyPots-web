import { FC, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { useInfiniteQuery } from '@tanstack/react-query';
import getTradePosts, { getTradePostsKey } from 'api/trade/getTradePosts';
import { UsedTradePost } from 'types/api/common';
import TradeView from './TradeView';
import type { TradeViewProps } from './TradeView';

const TradeControllerController: FC = () => {
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  const { data, fetchNextPage } = useInfiniteQuery(
    getTradePostsKey(),
    ({ pageParam = 0 }) =>
      getTradePosts({
        pageNumber: pageParam,
        pageSize: 10,
        sortField: 'createdAt',
        sortOption: 'desc',
      }),
    {
      getNextPageParam: (lastpage) => lastpage.pageable.pageNumber + 1,
      onSuccess(res) {
        if (res.pages[res.pages.length - 1].last) {
          setIsLastPage(true);
        }
      },
    },
  );

  const router = useRouter();

  const handleObserver = useCallback(() => {
    if (data && data.pages[data.pages.length - 1]?.content) {
      if (isLastPage) {
        return;
      }
      fetchNextPage();
    }
  }, [isLastPage, data, fetchNextPage]);

  const viewProps: TradeViewProps = {
    handleObserver,
    onSearchClick: () => router.push('/trade/search'),
    posts: data ? ([] as UsedTradePost[]).concat(...data.pages.map((item) => item.content)) : [],
    each: (item) => ({
      nickname: item.writer.nickname,
      title: item.title,
      cost: `${item.goodsPrice} 원`,
      onClick: () => router.push(`/trade/${item.postId}`),
      thumbnail: item.thumbnailImageFile,
      content: item.content,
      uploadedAt: item.uploadedAt,
      kakaoLink: item.chatRoomLink,
      commentCount: item.commentCount,
      images: item.attachedFiles,
      tradeStatus: item.tradeStatus,
    }),
  };
  return <TradeView {...viewProps} />;
};

export default TradeControllerController;
