import axios from 'libs/axios';

interface LoginParameter {
  code: string;
}

interface LoginResponse {
  accessToken: string;
}

const login = async ({ code }: LoginParameter) => {
  const { data } = await axios.get<LoginResponse>(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/auth/login/kakao`,
    {
      params: {
        authorizationCode: code,
      },
      withCredentials: true,
    },
  );

  return data;
};

export default login;
