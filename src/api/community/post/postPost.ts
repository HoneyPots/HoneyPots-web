import axios from 'libs/axios';

import type { PostType } from 'types/api/common';

interface PostPostRequest {
  title: string;
  content: string;
}

export default async function postPost({ title, content }: PostPostRequest) {
  const { data } = await axios.post<PostType>('/api/posts/normal', { title, content });

  return data;
}
