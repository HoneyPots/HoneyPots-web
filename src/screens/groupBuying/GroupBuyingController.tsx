import { useRouter } from 'next/router';
import { FC, useCallback, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import getGBPosts, { getGBPostsKey } from 'api/groupBuying/getGBPosts';
import { GroupBuyingPostType } from 'types/api/group-buying';
import GroupBuyingControllerView from './GroupBuyingView';

import type { GroupBuyingViewProps } from './GroupBuyingView';

interface GroupBuyingControllerProps {
  examples?: any;
}

type BadgeType = '양식' | '일식' | '중식' | '한식' | '기타';

const GroupBuyingController: FC<GroupBuyingControllerProps> = () => {
  const router = useRouter();
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  const { data, fetchNextPage } = useInfiniteQuery(
    getGBPostsKey(),
    ({ pageParam }) =>
      getGBPosts({
        pageNumber: pageParam,
        pageSize: 12,
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

  const handleObserver = useCallback(() => {
    if (data && data.pages[data.pages.length - 1]?.content) {
      if (isLastPage) {
        return;
      }
      fetchNextPage();
    }
  }, [isLastPage, data, fetchNextPage]);

  const viewProps: GroupBuyingViewProps = {
    onSearchClick: () => router.push('/group-buying/search'),
    each: (item) => ({
      onClick: () => router.push(`/group-buying/${item.postId}`),
      ...item,
    }),
    posts: data
      ? ([] as GroupBuyingPostType[]).concat(...data.pages.map((item) => item.content))
      : [],
    handleObserver,
  };
  return <GroupBuyingControllerView {...viewProps} />;
};

export default GroupBuyingController;
