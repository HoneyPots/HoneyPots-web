import axios from 'axios';

interface LoginParameter {
  code: string;
}

interface LoginResponse {
  accessToken: string;
  memberId: number;
  isNewMember: boolean;
}

const login = async ({ code }: LoginParameter) => {
  const { data } = await axios.post<LoginResponse>(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/auth/login/kakao`,
    {
      authorizationCode: code,
    },
    {
      withCredentials: true,
    },
  );

  return data;
};

export default login;
