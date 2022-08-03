import baseAxios from 'axios';

const axios = baseAxios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,

  headers: { 'Content-type': 'application/json', Authorization: '1' },
});

export default axios;
