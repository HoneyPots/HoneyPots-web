import { Post } from 'api/@types';
import axios from 'api/axios';

export interface GetPostRequest {
  postId: string;
}

export default async function getPost({ postId }: GetPostRequest): Promise<Post> {
  const {
    data: { result },
  } = await axios.get(`/api/posts/normal/${postId}`);

  return result;
}
