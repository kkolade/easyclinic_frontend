import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_URL } from 'utils/constants';
import { getJwtFromLocalStorage, getUserFromLocalStorage } from 'utils/localStorageUserJwt';

export const getAppointments = createAsyncThunk(
  'appointments/getAppointments',
  async (_, { rejectWithValue }) => {
    try {
      const user = getUserFromLocalStorage();
      const response = await axios.get(`${API_URL}/users/${user.id}/reservations`, {
        headers: {
          Authorization: `bearer ${getJwtFromLocalStorage()}`,
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
      const user = getUserFromLocalStorage();
      const response = await axios.post(
        `${API_URL}/users/${user.id}/reservations`,
        appointmentData,
        {
          headers: {
            Authorization: `bearer ${getJwtFromLocalStorage()}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      const errorMessages = error.response.data.errors.map((e, i) => ({
        id: i,
        message: e,
      }));
      return rejectWithValue(errorMessages);
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
