import axios from 'api/axios';

interface PostPostRequest {
  title: string;
  content: string;
}

function postPost({ title, content }: PostPostRequest) {
  return axios({
    method: 'POST',
    url: '/api/posts/normal',
    data: {
      title,
      content,
    },
  });
}

export default postPost;
