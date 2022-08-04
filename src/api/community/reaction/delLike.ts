import axios from 'libs/axios';

import type { PostType } from 'types/api/common';

interface DelLikeParams {
  reactionId: number;
}

export default async function delLike({ reactionId }: DelLikeParams) {
  const { data } = await axios.delete<PostType>(`/api/reactions/likes/${reactionId}`);

  return data;
}
