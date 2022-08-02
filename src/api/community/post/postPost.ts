import axios from 'libs/axios';

import type { Post } from 'types/api/common';

interface PostPostRequest {
  title: string;
  content: string;
}

export default async function postPost({ title, content }: PostPostRequest) {
  const { data } = await axios.post<Post>(
    '/api/posts/normal',
    { title, content },
    { headers: { 'Content-type': 'application/json' } },
  );

  return data;
}
