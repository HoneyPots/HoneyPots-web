import initialAxios from 'axios';

const axios = initialAxios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer 1',
  },
});

export default axios;
