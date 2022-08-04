import axios from 'libs/axios';

import type { PostType } from 'types/api/common';

interface PostLikeParams {
  targetId: number;
  targetType: 'POST' | 'COMMENT';
}

export default async function postLike({ targetId, targetType }: PostLikeParams) {
  const { data } = await axios.post<PostType>('/api/reactions/likes', { targetId, targetType });

  return data;
}
