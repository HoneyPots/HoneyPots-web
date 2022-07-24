import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction, combineReducers, Reducer } from '@reduxjs/toolkit';

export interface RootState {}

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
      return combineReducers({})(state, action);
  }
};

export default rootReducer;
