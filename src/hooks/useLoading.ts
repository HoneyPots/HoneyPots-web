import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'libs/store/modules';
import { loadingActions } from 'libs/store/modules/loading';

const useLoading = () => {
  const dispatch = useDispatch();
  const appLoading = useSelector<RootState, boolean>(({ loading }) => loading.appLoading);
  const startLoading = useCallback(() => {
    dispatch(loadingActions.setLoading(true));
  }, [dispatch]);

  const endLoading = useCallback(() => {
    setTimeout(() => dispatch(loadingActions.setLoading(false)), 600);
  }, [dispatch]);

  return { appLoading, startLoading, endLoading };
};

export default useLoading;
