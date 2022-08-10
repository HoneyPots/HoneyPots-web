import axios from 'libs/axios';

interface DeleteTradePostParams {
  postId: string;
}

export default async function delTradePost({ postId }: DeleteTradePostParams) {
  const { data } = await axios.delete(`/api/posts/normal/${postId}`);

  return data;
}
