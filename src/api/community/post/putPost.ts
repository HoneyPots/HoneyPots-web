import axios from 'api/axios';

interface PutPostRequest {
  postId: string;
  title: string;
  content: string;
}

function putPost({ postId, content, title }: PutPostRequest) {
  return axios({
    method: 'PUT',
    url: `/api/pists/normal/${postId}`,
    data: {
      title,
      content,
    },
  });
}

export default putPost;
