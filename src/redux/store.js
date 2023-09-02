import { configureStore } from '@reduxjs/toolkit';
import appointmentsReducer from './appointmentsSlice';

const store = configureStore({
  reducer: {
    appointments: appointmentsReducer,
    placeholderReducer: () => ({}),
  },
});

export default store;
