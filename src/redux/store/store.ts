import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authSlices from "../slices/authSlices";

export const store = configureStore({
  reducer: {
    login: authSlices.login,
    register: authSlices.register,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
