import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
  accessToken: string;
  isLogin: boolean;
  userId?: number;
};

type SetTokenAction = PayloadAction<string>;

const initialState: UserState = {
  accessToken: '',
  isLogin: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: SetTokenAction) => {
      state.accessToken = action.payload;
    },
    setIsLogin: (state) => {
      state.isLogin = true;
    },
    setUserId: (state, action: PayloadAction<number>) => {
      state.userId = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
