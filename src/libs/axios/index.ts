import baseAxios from 'axios';

const axios = baseAxios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,

  headers: {
    'Content-type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNjU5NjE1ODg5LCJleHAiOjE2NTk3MDIyODl9.1HAH2sXJBEI1JXoC6Hv7a3_x2smxI27BHmPmzL0wzAq_QJjRb93IofxRc_hpqOkQMeE_zELSRKm6ZrvQs4I5aw',
  },
});

export default axios;
