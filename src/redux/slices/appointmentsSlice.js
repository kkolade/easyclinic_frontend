import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_URL, LOCAL_STORAGE_JWT_KEY, LOCAL_STORAGE_USER_KEY } from 'utils/constants';

const userId = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY))?.id;
const authorizationToken = `bearer ${localStorage.getItem(LOCAL_STORAGE_JWT_KEY)}`;
const appointmentsUrl = `${API_URL}/users/${userId}/reservations`;

export const getAppointments = createAsyncThunk(
  'appointments/getAppointments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(appointmentsUrl, {
        headers: {
          Authorization: authorizationToken,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const createAppointment = createAsyncThunk(
  'appointments/createAppointment',
  async (appointmentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(appointmentsUrl, appointmentData, {
        headers: {
          Authorization: authorizationToken,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: {
    appointments: [],
    loading: false,
    error: null,
  },
  extraReducers(builder) {
    builder
      .addCase(getAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.appointments = action.payload;
      })
      .addCase(getAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.appointments.push(action.payload);
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default appointmentsSlice.reducer;
