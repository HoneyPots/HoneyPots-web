import { FC, useMemo, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import getPost, { getPostKey } from 'api/community/post/getPost';
import { LOADING_MUTATION } from 'pages/_app';
import putPost, { putPostKey } from 'api/community/post/putPost';
import PostEditView, { PostEditViewProps } from './PostEditView';

const PostEditController: FC = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const { isOpen, onClose, onOpen } = useDisclosure({});
  const queryClient = useQueryClient();

  const router = useRouter();

  const { isSuccess } = useQuery(
    getPostKey({ postId: router.query.postId as string }),
    () => getPost({ postId: router.query.postId as string }),
    {
      enabled: Boolean(router.query.postId),
      onSuccess: (res) => {
        setTitle(res.title);
        setContent(res.content);
      },
    },
  );

  const edit = useMutation(LOADING_MUTATION, putPost, {
    onSuccess() {
      router.back();
      queryClient.invalidateQueries(putPostKey({ postId: router.query.postId as string }));
    },
  });

  const errorMsg = useMemo(() => {
    if (title.length === 0) return '제목을 입력해주세요';
    if (title.length > 30) return '제목이 30자를 초과했습니다';
    if (content.length > 1000) return '내용이 1000자를 초과했습니다';
    if (content.length === 0) return '내용을 입력해주세요';
    return '';
  }, [title, content]);

  const viewProps: PostEditViewProps = {
    isSuccess,
    onHeaderClick: router.back,
    contentInputProps: {
      onChange: (e) => setContent(e.target.value),
      value: content,
    },
    titleInputProps: {
      value: title,
      onChange: (e) => setTitle(e.target.value),
    },
    onButtonClick: () => {
      if (errorMsg.length === 0) {
        edit.mutate({ content, title, postId: router.query.postId as string });
      } else {
        onOpen();
      }
    },
    alertProps: {
      body: errorMsg,
      header: '오류',
      isOpen,
      onClose,
      onButtonClick: onClose,
    },
  };
  return <PostEditView {...viewProps} />;
};

export default PostEditController;
