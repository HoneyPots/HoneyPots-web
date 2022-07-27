import { NextApiHandler } from 'next';
import axios from 'libs/axios';

const login: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/api/auth/login/kakao`, {
        params: {
          authorizationCode: req.query.authorizationCode,
        },
      });
      res.status(200).json(data);
    } catch (error) {
      // console.log(error);
    }
  }
  res.status(400);
};

export default login;
