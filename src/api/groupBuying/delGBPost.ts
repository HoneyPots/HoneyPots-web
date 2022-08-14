import axios from 'libs/axios';

interface DeleteGBPostParams {
  postId: string;
}

export default async function delGBPost({ postId }: DeleteGBPostParams) {
  const { data } = await axios.delete(`/api/posts/group-buying/${postId}`);

  return data;
}
