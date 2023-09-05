import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_BASE_URL as BASE_URL } from 'utils/constants';
import {
  getUserFromLocalStorage,
  removeUserAndJwtFromLocalStorage,
  saveUserAndJwtToLocalStorage,
} from 'utils/localStorageUserJwt';

export const userSignup = createAsyncThunk('user/signup', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, userData, {
      headers: {
        Accept: 'application/json',
      },
    });
    return {
      user: response.data.user,
      jwt: response.data.jwt,
    };
  } catch (error) {
    const errorMessages = error.response.data.errors.map((e, i) => ({
      id: i,
      message: e,
    }));
    return rejectWithValue(errorMessages);
  }
});

export const userSignin = createAsyncThunk(
  'user/signin',
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
    user: undefined,
    jwt: null,
    loading: true,
    error: null,
  },
  reducers: {
    loadUserFromLocalStorage: (state) => {
      const user = getUserFromLocalStorage();
      const jwt = localStorage.getItem('jwt');
      if (user && jwt) {
        state.user = user;
        state.jwt = jwt;
      }
      state.loading = false;
    },
    userSignout: (state) => {
      state.user = null;
      state.jwt = null;
      removeUserAndJwtFromLocalStorage();
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userSignin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userSignin.fulfilled, (state, action) => {
        saveUserAndJwtToLocalStorage(action.payload.user, action.payload.jwt);
        state.loading = false;
        state.error = null;
        state.user = action.payload.user;
        state.jwt = action.payload.jwt;
      })
      .addCase(userSignin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(userSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userSignup.fulfilled, (state, action) => {
        saveUserAndJwtToLocalStorage(action.payload.user, action.payload.jwt);
        state.loading = false;
        state.error = null;
        state.user = action.payload.user;
        state.jwt = action.payload.jwt;
      })
      .addCase(userSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { loadUserFromLocalStorage, userSignout } = userSlice.actions;

export default userSlice.reducer;
