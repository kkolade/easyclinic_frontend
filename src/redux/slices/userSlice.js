import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_BASE_URL as BASE_URL } from 'utils/constants';

export const userLogin = createAsyncThunk(
  'user/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/login`,
        { username, password },
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );
      return {
        user: response.data.user,
        jwt: response.data.jwt,
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    jwt: null,
    loading: false,
    error: null,
  },
  reducers: {
    loadUserFromLocalStorage: (state) => {
      const user = JSON.parse(localStorage.getItem('user'));
      const jwt = localStorage.getItem('jwt');
      if (user && jwt) {
        state.user = user;
        state.jwt = jwt;
      }
    },
    userLogout: (state) => {
      state.user = null;
      state.jwt = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        localStorage.setItem('user', JSON.stringify(action.payload));
        state.loading = false;
        state.error = null;
        state.user = action.payload.user;
        state.jwt = action.payload.jwt;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { loadUserFromLocalStorage, userLogout } = userSlice.actions;

export default userSlice.reducer;
