import axios from 'libs/axios';

interface LoginParameter {
  code: string;
}

const login = async ({ code }: LoginParameter) => {
  //   const { data } = await axios.get<string>('api/auth/login', {
  //     params: {
  //       authorizationCode: code,
  //     },
  //   });
  //   return data;
};

export default login;
