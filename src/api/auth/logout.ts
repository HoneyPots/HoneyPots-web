import axios from 'libs/axios';

const logout = async () => {
  const { data } = await axios.delete('/api/auth/token', {
    data: {
      grantType: 'refresh_token',
    },
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });

  return data;
};

export default logout;
