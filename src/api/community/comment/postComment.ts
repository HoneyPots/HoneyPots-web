import axios from 'libs/axios';

import type { PostType } from 'types/api/common';

interface PostCommentParams {
  postId: string;
  content: string;
}

export default async function postComment({ postId, content }: PostCommentParams) {
  const { data } = await axios.post<PostType>('/api/comments', { postId, content });

  return data;
}
