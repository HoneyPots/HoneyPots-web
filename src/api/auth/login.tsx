import axios from 'libs/axios';

interface LoginParameter {
  code: string;
}

const login = async ({ code }: LoginParameter) => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/api/auth/login/kakao`, {
    params: {
      authorizationCode: code,
    },
  });
  return data;
};

export default login;
