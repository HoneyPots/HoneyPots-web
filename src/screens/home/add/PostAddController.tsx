import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import PostAddView from './PostAddView';
import type { PostAddViewProps } from './PostAddView';
import { useMutation } from '@tanstack/react-query';
import postPost from 'api/community/post/postPost';

interface PostAddControllerControllerProps {
  examples?: any;
}

const PostAddControllerController: FC<PostAddControllerControllerProps> = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const router = useRouter();

  const add = useMutation(postPost, {
    onSuccess() {
      router.push('/');
    },
  });

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
      add.mutate({ content, title });
    },
  };

  return <PostAddView {...viewProps} />;
};

export default PostAddControllerController;
