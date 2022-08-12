import { useRouter } from 'next/router';
import { FC, useCallback, useMemo, useState } from 'react';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import getComments, { getCommentsKey } from 'api/community/comment/getComments';
import { Comment } from 'types/api/common';
import getTradePost, { getTradePostKey } from 'api/trade/getTradePost';
import postComment from 'api/community/comment/postComment';
import { TradePostProps } from '../components/TradePost';
import TradeDetailView from './TradeDetailView';

import type { TradeDetailViewProps } from './TradeDetailView';

// interface TradeDetailControllerProps {
//   examples?: any;
// }

const TradeDetailController: FC = () => {
  const router = useRouter();
  const [comment, setComment] = useState<string>('');
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const { data, refetch: refetchPost } = useQuery(
    getTradePostKey({ postId: router.query.postId as string }),
    () => getTradePost({ postId: router.query.postId as string }),
    {
      enabled: Boolean(router.query.postId),
    },
  );

  const {
    data: comments,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery(
    getCommentsKey(router.query.postId as string),
    ({ pageParam }) =>
      getComments({
        pageNumber: pageParam,
        pageSize: 20,
        postId: router.query.postId as string,
        sortField: 'createdAt',
        sortOption: 'desc',
      }),
    {
      enabled: Boolean(router.query.postId),
      getNextPageParam: (lastPage) => lastPage.pageable.pageNumber + 1,
      onSuccess(res) {
        if (res.pages[res.pages.length - 1].last) {
          setIsLastPage(true);
        }
      },
    },
  );

  const leaveComment = useMutation(postComment, {
    onMutate: () => {
      setComment('');
    },
    onSuccess: () => {
      refetch();
      refetchPost();
    },
  });

  const handleObserver = useCallback(() => {
    if (comments && comments.pages[comments.pages.length - 1]?.content) {
      if (isLastPage) {
        return;
      }
      fetchNextPage();
    }
  }, [isLastPage, comments, fetchNextPage]);

  const tradePostProps: TradePostProps | undefined = useMemo(() => {
    if (!data) return undefined;
    return {
      content: data.content,
      commentCount: data.commentCount,
      title: data.title,
      uploadedAt: data.uploadedAt,
      nickname: data.writer.nickname,
      cost: `${data.goodsPrice}원`,
      images: data.attachedFiles,
      thumbnail: data.thumbnailImageFile,
      kakaoLink: data.chatRoomLink,
    };
  }, [data]);

  const viewProps: TradeDetailViewProps = {
    onHeaderClick: router.back,
    tradePostProps,
    commentInputProps: {
      onChange: (e) => setComment(e.currentTarget.value),
      onSubmitClick: () => {
        leaveComment.mutate({
          content: comment,
          postId: router.query.postId as string,
        });
      },
      value: comment,
    },
    comments: comments
      ? ([] as Comment[]).concat(...comments.pages.map((item) => item.content))
      : [],
    handleObserver,
  };
  return <TradeDetailView {...viewProps} />;
};

export default TradeDetailController;
