import { createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  appointments: [],
  status: 'idle',
  error: null,
};

// Add JWT token here
const token = localStorage.getItem('token');

export const fetchDoctorAppointments = createAsyncThunk(
  'appointments/fetchDoctorAppointments',
  async () => {
    const response = await fetch('http://localhost:3000/api/v1/users/:user_id/reservations', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  },
);
