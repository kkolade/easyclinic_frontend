import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    placeholderReducer: () => ({}),
  },
});

export default store;
