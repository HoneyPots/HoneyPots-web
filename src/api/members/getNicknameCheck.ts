import axios from 'libs/axios';

interface GetNicknameCheckParams {
  nickname: string;
}

export const getNicknameCheckKey = (nickname: string) => ['/api/members/profile', nickname];

const getNicknameCheck = async ({ nickname }: GetNicknameCheckParams) => {
  const { data } = await axios.get('/api/members/profile', {
    params: {
      nickname,
    },
    headers: { 'Content-Type': 'application/json' },
  });

  return data;
};

export default getNicknameCheck;
