import baseAxios from 'axios';

const axios = baseAxios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,

  headers: {
    Authorization: 'Bearer ',
  },
});

export default axios;
