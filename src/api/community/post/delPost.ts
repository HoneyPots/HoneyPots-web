import axios from 'libs/axios';

interface DeletePostRequest {
  postId: string;
}

export default async function delPost({ postId }: DeletePostRequest) {
  const { data } = await axios.delete(`/api/posts/normal/${postId}`);

  return data;
}
