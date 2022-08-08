import axios from 'libs/axios';

interface PostTokenResponse {
  accessToken: string;
  refreshToken: string;
}

const postToken = async () => {
  const { data } = await axios.post<PostTokenResponse>(
    '/api/auth/token',
    { grantType: 'refresh_token' },
    { headers: { 'Content-Type': 'application/json' } },
  );

  return data;
};

export default postToken;
