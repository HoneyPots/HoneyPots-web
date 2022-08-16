import axios from 'libs/axios';

interface PostReportsParams {
  target?: 'POST' | 'COMMENT';
  targetId: string;
  reason: string;
}

const postReports = async ({ target = 'POST', reason, targetId }: PostReportsParams) => {
  const { data } = await axios.post('/api/reports', { target, targetId, reason });

  return data;
};

export default postReports;
