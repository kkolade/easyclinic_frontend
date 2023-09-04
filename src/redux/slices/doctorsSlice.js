import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from 'utils/constants';

export const getDoctors = createAsyncThunk('doctors/getDoctors', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/doctors`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});

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
      });
  },
});

export default doctorsSlice.reducer;
