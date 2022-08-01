import axios from 'api/axios';

interface DeletePostRequest {
  postId: string;
}

function delPost({ postId }: DeletePostRequest) {
  return axios({ method: 'DELETE', url: `/api/posts/normal/${postId}` });
}

export default delPost;
