import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoutes';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import { loadUserFromLocalStorage } from './redux/slices/userSlice';
import { selectUser } from './redux/store';

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(loadUserFromLocalStorage());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<ProtectedRoute isAllowed={!user} />}>
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
