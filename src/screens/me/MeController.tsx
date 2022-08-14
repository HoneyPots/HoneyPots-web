import { useMutation } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from 'libs/store/modules';
import deleteMember from 'api/members/deleteMember';
import { userActions } from 'libs/store/modules/user';
import MeView from './MeView';

import type { FC } from 'react';
import type { MeViewProps } from './MeView';

const MeController: FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const userId = useSelector<RootState, number | undefined>(({ user }) => user.userId);

  const { mutate: delMember } = useMutation(deleteMember, {
    onSuccess: () => {
      dispatch(userActions.setToken(''));
      dispatch(userActions.setUserId(undefined));

      router.replace('/auth/login');
    },
  });

  const viewProps: MeViewProps = {
    onDeleteAccountClick: () => {
      if (userId) {
        delMember({ memberId: userId });
      }
    },
  };
  return <MeView {...viewProps} />;
};

export default MeController;
