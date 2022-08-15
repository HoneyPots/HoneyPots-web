import { useRouter } from 'next/router';
import { FC, useCallback, useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import searchPosts, { searchPostsKey } from 'api/community/search/searchPosts';
import { GroupBuyingPostType } from 'types/api/group-buying';
import GroupBuyingSearch, { GroupBuyingSearchProps } from './GroupBuyingSearchView';

const GroupBuyingSearchController: FC = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState<string | null>(null);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  const { data, fetchNextPage } = useInfiniteQuery(
    searchPostsKey('GROUP_BUYING', keyword),
    ({ pageParam }) =>
      searchPosts<GroupBuyingPostType>({
        keyword: keyword as string,
        page: pageParam,
        postType: 'GROUP_BUYING',
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
      enabled: Boolean(keyword),
    },
  );

  useEffect(() => {
    const queryKeyword = router.query.keyword;

    if (queryKeyword && typeof queryKeyword === 'string') {
      setKeyword(queryKeyword);
    } else {
      setKeyword(null);
    }
  }, [router]);

  const handleObserver = useCallback(() => {
    if (data && data.pages[data.pages.length - 1]?.content) {
      if (isLastPage) {
        return;
      }
      fetchNextPage();
    }
  }, [isLastPage, data, fetchNextPage]);

  const viewProps: GroupBuyingSearchProps = {
    searchViewProps: {
      onBackClick: router.back,
      onSubmit: (e) => {
        e.preventDefault();
        setKeyword(e.currentTarget.keyword.value);
        router.push({
          pathname: router.pathname,
          query: {
            keyword: e.currentTarget.keyword.value,
          },
        });
      },
      placeholder: '공동구매 검색',
    },
    posts:
      data && keyword
        ? ([] as GroupBuyingPostType[]).concat(...data.pages.map((item) => item.content))
        : [],
    each: (item) => ({
      onClick: () => router.push(`/group-buying/${item.postId}`),
      ...item,
    }),
    handleObserver,
    keyword,
  };
  return <GroupBuyingSearch {...viewProps} />;
};

export default GroupBuyingSearchController;
