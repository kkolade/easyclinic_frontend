import { configureStore } from '@reduxjs/toolkit';
import appointmentsReducer from './appointmentsSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    appointments: appointmentsReducer,
    user: userReducer,
  },
});

export const selectUser = (state) => state.user.user;
export const selectJWT = (state) => state.user.jwt;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;

export default store;
