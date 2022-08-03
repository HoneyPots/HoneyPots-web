import { FC, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { useDisclosure } from '@chakra-ui/react';
import postPost from 'api/community/post/postPost';
import PostAddView from './PostAddView';
import type { PostAddViewProps } from './PostAddView';

interface PostAddControllerControllerProps {
  examples?: any;
}

const PostAddControllerController: FC<PostAddControllerControllerProps> = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const { isOpen, onClose, onOpen } = useDisclosure({});

  const router = useRouter();

  const add = useMutation(postPost, {
    onSuccess() {
      router.push('/');
    },
  });

  const errorMsg = useMemo(() => {
    if (title.length === 0) return '제목을 입력해주세요';
    if (title.length > 30) return '제목이 30자를 초과했습니다';
    if (content.length > 1000) return '내용이 1000자를 초과했습니다';
    if (content.length === 0) return '내용을 입력해주세요';
    return '';
  }, [title, content]);

  const viewProps: PostAddViewProps = {
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
        add.mutate({ content, title });
      } else {
        onOpen();
      }
    },
    alertProps: {
      body: errorMsg,
      header: '오류',
      isOpen,
      onClose,
    },
  };

  return <PostAddView {...viewProps} />;
};

export default PostAddControllerController;
