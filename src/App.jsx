import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import {
  AddDoctorPage,
  BookAppointmentPage,
  DeleteDoctorsPage,
  DoctorDetailsPage,
  HomePage,
  MyAppointmentsPage,
  NotFoundPage,
  SigninPage,
  SignupPage,
} from './pages';
import { loadUserFromLocalStorage } from './redux/slices/userSlice';
import { selectUser, selectUserLoading } from './redux/store';

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const userLoading = useSelector(selectUserLoading);

  useEffect(() => {
    dispatch(loadUserFromLocalStorage());
  }, [dispatch]);

  if (userLoading) return null;

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/doctors/:id" element={<DoctorDetailsPage />} />
      <Route element={<ProtectedRoute redirectPath="/" isAllowed={!user} />}>
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>
      <Route element={<ProtectedRoute isAllowed={!!user} />}>
        <Route path="/book-appointment" element={<BookAppointmentPage />} />
        <Route path="/appointments" element={<MyAppointmentsPage />} />
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
