import { LOCAL_STORAGE_JWT_KEY, LOCAL_STORAGE_USER_KEY } from './constants';

// JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY));

export const saveUserAndJwtToLocalStorage = (user, jwt) => {
  localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
  localStorage.setItem(LOCAL_STORAGE_JWT_KEY, jwt);
};

export const removeUserAndJwtFromLocalStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
  localStorage.removeItem(LOCAL_STORAGE_JWT_KEY);
};

export const getUserFromLocalStorage = () => JSON.parse(
  localStorage.getItem(LOCAL_STORAGE_USER_KEY),
);

export const getJwtFromLocalStorage = () => localStorage.getItem(LOCAL_STORAGE_JWT_KEY);
