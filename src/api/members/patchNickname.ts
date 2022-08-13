import axios from 'libs/axios';

interface PatchNicknameParameter {
  memberId: string;
  nickname: string;
}

const patchNickname = async ({ memberId, nickname }: PatchNicknameParameter) => {
  await axios.patch(
    `/api/members/${memberId}/profile/nickname`,
    {
      nickname,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

export default patchNickname;
