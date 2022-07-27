import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction, combineReducers, Reducer } from '@reduxjs/toolkit';
import user, { UserState } from './user';

export interface RootState {
  user: UserState;
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
      return combineReducers({ user })(state, action);
  }
};

export default rootReducer;
