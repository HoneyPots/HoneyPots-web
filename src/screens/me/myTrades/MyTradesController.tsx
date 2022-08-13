import { FC, useCallback, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import getMyPosts, { getMyPostsKey } from 'api/members/getMyPosts';
import MyTradesView, { MyTradesViewProps } from './MyTradesView';
import type { UsedTradePost } from 'types/api/common';

const MyTradesController: FC = () => {
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  const router = useRouter();

  const { data, fetchNextPage } = useInfiniteQuery(
    getMyPostsKey('USED_TRADE'),
    ({ pageParam, queryKey: [, postType] }) =>
      getMyPosts({
        page: pageParam,
        size: 10,
        postType,
        sortField: 'createdAt',
        sortOption: 'desc',
      }),
    {
      getNextPageParam: (lastPage) => lastPage.pageable.pageNumber + 1,
      onSuccess: (res) => {
        if (res.pages[res.pages.length - 1].last) {
          setIsLastPage(true);
        }
      },
    },
  );

  const handleObserver = useCallback(() => {
    if (data && data.pages[data.pages.length - 1]?.content) {
      if (isLastPage) {
        return;
      }
      fetchNextPage();
    }
  }, [isLastPage, data, fetchNextPage]);

  const viewProps: MyTradesViewProps = {
    onHeaderClick: router.back,
    posts: data
      ? ([] as UsedTradePost[]).concat(...data.pages.map((item) => item.content as UsedTradePost[]))
      : [],
    handleObserver,
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
    }),
  };
  return <MyTradesView {...viewProps} />;
};

export default MyTradesController;
