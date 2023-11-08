import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const apiURL = 'http://localhost:3000/api/v1/clinics/';

export const fetchClinicsByDoctorId = createAsyncThunk(
  'clinic/fetchByDoctorId',
  async (doctorId, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user.jwt;

      if (!token) {
        throw new Error('User token not found in localStorage');
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const response = await fetch(`${apiURL}?doctor_id=${doctorId}`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch clinic data');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const clinicSlice = createSlice({
  name: 'clinic',
  initialState: {
    clinicsData: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClinicsByDoctorId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClinicsByDoctorId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.clinicsData = action.payload;
      })
      .addCase(fetchClinicsByDoctorId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default clinicSlice.reducer;
