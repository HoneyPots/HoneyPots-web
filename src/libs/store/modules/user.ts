import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
  accessToken: string;
  isLogin: boolean;
  userId?: string;
};

type SetTokenAction = PayloadAction<string>;

const initialState: UserState = {
  accessToken: '',
  isLogin: false,
  userId: undefined,
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
    setUserId: (state, action: PayloadAction<string | undefined>) => {
      state.userId = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
