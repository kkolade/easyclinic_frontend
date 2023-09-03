import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Route, Routes, useLocation, useNavigate,
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import { loadUserFromLocalStorage } from './redux/slices/userSlice';
import { selectUser } from './redux/store';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(loadUserFromLocalStorage());
  }, [dispatch]);

  // todo: fix component flash (using protected routes?)
  useEffect(() => {
    if (user) {
      if (location.pathname === '/signin' || location.pathname === '/signup') {
        navigate('/');
      }
    } else if (location.pathname !== '/signin' && location.pathname !== '/signup') {
      navigate('/signin');
    }
  }, [user, location, navigate]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
