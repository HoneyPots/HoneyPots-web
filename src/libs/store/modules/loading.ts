import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LoadingState = {
  appLoading: boolean;
};

const initialState: LoadingState = {
  appLoading: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.appLoading = action.payload;
    },
  },
});

export const loadingActions = loadingSlice.actions;

export default loadingSlice.reducer;
