import { useRouter } from 'next/router';
import { FC, useCallback, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import searchPosts, { searchPostsKey } from 'api/community/search/searchPosts';
import { UsedTradePost } from 'types/api/common';
import SearchTradeView, { SearchTradeViewProps } from './SearchTradeView';

const SearchTradeController: FC = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>('');
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  const { data, fetchNextPage } = useInfiniteQuery(
    searchPostsKey('USED_TRADE', keyword),
    ({ pageParam }) =>
      searchPosts<UsedTradePost>({
        keyword,
        page: pageParam,
        postType: 'USED_TRADE',
        size: 20,
        sortField: 'createdAt',
        sortOption: 'desc',
      }),
    {
      getNextPageParam: (lastPage) => lastPage.pageable.pageNumber + 1,
      onSuccess(res) {
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

  const viewProps: SearchTradeViewProps = {
    searchViewProps: {
      onBackClick: router.back,
      onSubmit: (e) => {
        e.preventDefault();
        setKeyword((e.target as HTMLFormElement).keyword.value);
      },
      placeholder: '중고거래 검색',
    },
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
    handleObserver,
    posts: data ? ([] as UsedTradePost[]).concat(...data.pages.map((item) => item.content)) : [],
  };
  return <SearchTradeView {...viewProps} />;
};

export default SearchTradeController;
