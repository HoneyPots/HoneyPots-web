import { FC, useCallback, useMemo, useState } from 'react';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import getPost, { getPostKey } from 'api/community/post/getPost';
import getComments, { getCommentsKey } from 'api/community/comment/getComments';
import { Comment, PostType } from 'types/api/common';
import postComment from 'api/community/comment/postComment';
import { MenuItemType } from 'components/header/HeaderRight';
import useMe from 'hooks/useMe';
import delPost from 'api/community/post/delPost';
import delLike from 'api/community/reaction/delLike';
import postLike from 'api/community/reaction/postLike';
import PostDetailView from './PostDetailView';
import type { PostDetailViewProps } from './PostDetailView';

const PostDetailControllerController: FC = () => {
  const router = useRouter();
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');
  const queryClient = useQueryClient();
  const { isMe } = useMe();
  const { onClose, onOpen, isOpen } = useDisclosure();

  const { data, refetch: refetchPost } = useQuery(
    getPostKey({ postId: router.query.postId as string }),
    () => getPost({ postId: router.query.postId as string }),
    {
      enabled: Boolean(router.query.postId),
    },
  );

  const del = useMutation(delPost, {
    onSuccess: () => {
      router.push('/');
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

  const deleteLike = useMutation(delLike);
  const addLike = useMutation(postLike);

  const toggleLike = (post: PostType) =>
    queryClient.setQueryData<PostType>(
      getPostKey({ postId: router.query.postId as string }),
      (oldData) => {
        if (oldData) {
          if (oldData.isLiked) {
            deleteLike.mutate({ reactionId: post.likeReactionId });
          } else {
            addLike.mutate({ targetId: post.postId, targetType: 'POST' });
          }

          const result: PostType = {
            ...oldData,
            isLiked: !oldData.isLiked,
            likeReactionCount: oldData.isLiked
              ? oldData.likeReactionCount - 1
              : oldData.likeReactionCount + 1,
          };

          return result;
        }
        return oldData;
      },
    );

  const menuLists: MenuItemType[] = useMemo(() => {
    if (data) {
      if (isMe(data.writer.id)) {
        const result: MenuItemType[] = [
          { name: '수정', onClick: () => router.push(`/post/edit/${router.query.postId}`) },
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

  const viewProps: PostDetailViewProps = {
    post: data && {
      ...data,
      onLikeClick: () => toggleLike(data),
    },
    comments: comments
      ? ([] as Comment[]).concat(...comments.pages.map((item) => item.content))
      : [],
    handleObserver,
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
    onHeaderClick: () => router.back(),
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
  return <PostDetailView {...viewProps} />;
};

export default PostDetailControllerController;
