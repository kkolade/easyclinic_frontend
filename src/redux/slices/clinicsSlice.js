import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_URL, LOCAL_STORAGE_JWT_KEY } from 'utils/constants';

export const getClinics = createAsyncThunk('clinics/getClinics', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/clinics`, {
      headers: {
        Authorization: `bearer ${localStorage.getItem(LOCAL_STORAGE_JWT_KEY)}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});

const clinicsSlice = createSlice({
  name: 'clinics',
  initialState: {
    clinics: [],
    loading: false,
    error: null,
  },
  extraReducers(builder) {
    builder
      .addCase(getClinics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClinics.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.clinics = action.payload;
      })
      .addCase(getClinics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default clinicsSlice.reducer;
