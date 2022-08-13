import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'libs/store/modules';

const useMe = () => {
  const userId = useSelector<RootState, number | undefined>(({ user }) => user.userId);

  const isMe = useCallback((id: number) => userId === id, [userId]);

  return { isMe, userId };
};

export default useMe;
