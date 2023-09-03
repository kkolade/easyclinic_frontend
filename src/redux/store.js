import { configureStore } from '@reduxjs/toolkit';

import appointmentsReducer from './slices/appointmentsSlice';
import doctorsReducer from './slices/doctorsSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    appointments: appointmentsReducer,
    doctors: doctorsReducer,
    user: userReducer,
  },
});

// userReducer selectors
export const selectUser = (state) => state.user.user;
export const selectJWT = (state) => state.user.jwt;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;

// doctorsReducer selectors
export const selectDoctors = (state) => state.doctors.doctors;
export const selectDoctorsLoading = (state) => state.doctors.loading;
export const selectDoctorsError = (state) => state.doctors.error;

export default store;
