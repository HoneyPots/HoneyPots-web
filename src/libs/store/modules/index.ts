import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction, combineReducers, Reducer } from '@reduxjs/toolkit';
import user, { UserState } from './user';
import loading, { LoadingState } from './loading';

export interface RootState {
  user: UserState;
  loading: LoadingState;
}

const rootReducer: Reducer<RootState, AnyAction> = (
  state: RootState | undefined,
  action: AnyAction,
) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return combineReducers({ user, loading })(state, action);
  }
};

export default rootReducer;
