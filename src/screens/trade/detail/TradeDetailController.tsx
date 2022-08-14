import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';
import { FC, useCallback, useMemo, useState } from 'react';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import getComments, { getCommentsKey } from 'api/community/comment/getComments';
import useMe from 'hooks/useMe';
import { Comment } from 'types/api/common';
import { MenuItemType } from 'components/header/HeaderRight';
import delTradePost from 'api/trade/delTradePost';
import getTradePost, { getTradePostKey } from 'api/trade/getTradePost';
import postComment from 'api/community/comment/postComment';
import { getTradePostsKey } from 'api/trade/getTradePosts';
import { TradePostProps } from '../components/TradePost';
import TradeDetailView, { TradeDetailViewProps } from './TradeDetailView';

const TradeDetailController: FC = () => {
  const router = useRouter();
  const [comment, setComment] = useState<string>('');
  const queryClient = useQueryClient();
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const { data, refetch: refetchPost } = useQuery(
    getTradePostKey({ postId: router.query.postId as string }),
    () => getTradePost({ postId: router.query.postId as string }),
    {
      enabled: Boolean(router.query.postId),
    },
  );
  const { isMe } = useMe();
  const { onClose, onOpen, isOpen } = useDisclosure();

  const del = useMutation(delTradePost, {
    onSuccess: () => {
      router.push('/trade');
      queryClient.invalidateQueries(getTradePostsKey());
    },
  });

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

  const menuLists: MenuItemType[] = useMemo(() => {
    if (data) {
      if (isMe(data.writer.id)) {
        const result: MenuItemType[] = [
          { name: '수정', onClick: () => router.push(`/trade/edit/${router.query.postId}`) },
          {
            name: '삭제',
            onClick: () => onOpen(),
          },
        ];
        return result;
      }
      const result: MenuItemType[] = [
        {
          name: '신고하기',
          onClick: () => {},
        },
      ];
      return result;
    }
    const result: MenuItemType[] = [{ name: '신고하기', onClick: () => {} }];
    return result;
  }, [data, isMe, router, onOpen]);

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
      tradeStatus: data.tradeStatus,
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
    menuLists,
    alertProps: {
      isOpen,
      body: '삭제하시겠습니까?',
      header: '알림',
      onClose,
      buttonColor: '#EB3737',
      buttonText: '삭제',
      onButtonClick: () => del.mutate({ postId: router.query.postId as string }),
    },
  };
  return <TradeDetailView {...viewProps} />;
};

export default TradeDetailController;
