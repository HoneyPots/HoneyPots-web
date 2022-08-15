import { useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FC, useCallback, useState } from 'react';
import { GroupBuyingPostType } from 'types/api/group-buying';
import getMyPosts, { getMyPostsKey } from 'api/members/getMyPosts';
import MyGroupBuyingView, { MyGroupBuyingViewProps } from './MyGroupBuyingView';

const MyGroupBuyingController: FC = () => {
  const router = useRouter();
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  const { data, fetchNextPage } = useInfiniteQuery(
    getMyPostsKey('GROUP_BUYING'),
    ({ pageParam, queryKey: [, postType] }) =>
      getMyPosts<GroupBuyingPostType>({
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

  const viewProps: MyGroupBuyingViewProps = {
    onHeaderClick: router.back,
    each: (item) => ({
      onClick: () => router.push(`/group-buying/${item.postId}`),
      ...item,
    }),
    posts: data
      ? ([] as GroupBuyingPostType[]).concat(...data.pages.map((item) => item.content))
      : [],
    handleObserver,
  };
  return <MyGroupBuyingView {...viewProps} />;
};

export default MyGroupBuyingController;
