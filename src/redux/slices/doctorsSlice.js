import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_URL } from 'utils/constants';
import { getJwtFromLocalStorage } from 'utils/localStorageUserJwt';

export const getDoctors = createAsyncThunk('doctors/getDoctors', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/doctors`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});

export const createDoctor = createAsyncThunk(
  'doctors/createDoctor',
  async (doctorData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/doctors`, doctorData, {
        headers: {
          Authorization: `bearer ${getJwtFromLocalStorage()}`,
        },
      });
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

export const deleteDoctor = createAsyncThunk(
  'doctors/deleteDoctor',
  async (doctorId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/doctors/${doctorId}`, {
        headers: {
          Authorization: `bearer ${getJwtFromLocalStorage()}`,
        },
      });
      return {
        id: doctorId,
        message: response.data.message,
      };
    } catch (error) {
      return rejectWithValue(error.response.statusText);
    }
  },
);

const doctorsSlice = createSlice({
  name: 'doctors',
  initialState: {
    doctors: [],
    loading: false,
    error: null,
  },
  extraReducers(builder) {
    builder
      .addCase(getDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.doctors = action.payload;
      })
      .addCase(getDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.doctors.push(action.payload);
      })
      .addCase(createDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.doctors = state.doctors.filter((doctor) => doctor.id !== action.payload.id);
      })
      .addCase(deleteDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default doctorsSlice.reducer;
