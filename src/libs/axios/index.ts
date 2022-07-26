import baseAxios from 'axios';

const axios = baseAxios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
});

export default axios;
