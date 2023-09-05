import { configureStore } from '@reduxjs/toolkit';

import appointmentsReducer from './slices/appointmentsSlice';
import clinicsSlice from './slices/clinicsSlice';
import doctorsReducer from './slices/doctorsSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    appointments: appointmentsReducer,
    clinics: clinicsSlice,
    doctors: doctorsReducer,
    user: userReducer,
  },
});

// appointmentRecuer selectors
export const selectAppointments = (state) => state.appointments.appointments;
export const selectAppointmentsLoading = (state) => state.appointments.loading;
export const selectAppointmentsError = (state) => state.appointments.error;

// clinicsReducer selectors
export const selectClinics = (state) => state.clinics.clinics;
export const selectClinicsLoading = (state) => state.clinics.loading;
export const selectClinicsError = (state) => state.clinics.error;

// doctorsReducer selectors
export const selectDoctors = (state) => state.doctors.doctors;
export const selectSelectedDoctor = (state) => state.doctors.selectedDoctor;
export const selectDoctorsLoading = (state) => state.doctors.loading;
export const selectDoctorsError = (state) => state.doctors.error;

// userReducer selectors
export const selectUser = (state) => state.user.user;
export const selectJWT = (state) => state.user.jwt;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;

export default store;
