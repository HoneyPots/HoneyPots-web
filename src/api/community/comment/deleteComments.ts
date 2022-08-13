import axios from 'libs/axios';

interface DeleteCommentsParams {
  commentId: number;
}

const deleteComments = async ({ commentId }: DeleteCommentsParams) => {
  const { data } = await axios.delete(`/api/comments/${commentId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return data;
};
export default deleteComments;
