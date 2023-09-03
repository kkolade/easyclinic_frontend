import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoutes';
import AddDoctorPage from './pages/AddDoctorPage';
import DeleteDoctorsPage from './pages/DeleteDoctorsPage';
import DoctorDetailsPage from './pages/DoctorDetailsPage';
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
      <Route path="/doctors/:id" element={<DoctorDetailsPage />} />
      <Route element={<ProtectedRoute isAllowed={!user} />}>
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>
      <Route element={<ProtectedRoute isAllowed={user?.role === 'admin'} />}>
        <Route path="/add-doctor" element={<AddDoctorPage />} />
        <Route path="/delete-doctors" element={<DeleteDoctorsPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
