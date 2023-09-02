import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  appointments: [],
  status: 'idle',
  error: null,
};

const token = localStorage.getItem('token');

export const fetchAppointments = createAsyncThunk('appointments/fetchAppointments', async () => {
  const response = await fetch('http://localhost:3000/api/v1/users/:user_id/reservations', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
});

export const fetchDoctorDetails = createAsyncThunk(
  'doctors/fetchDoctorDetails',
  async (doctorId) => {
    const response = await fetch(`http://localhost:3000/api/v1/doctors/${doctorId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  },
);

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    addAppointment: (state, action) => {
      state.appointments.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addAppointment } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
