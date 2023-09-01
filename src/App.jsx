import {
  Link,
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from 'react-router-dom';

import AddDoctors from 'components/AddDoctors';
import Appointments from 'components/Appointments';
import Booking from 'components/Booking';
import DeleteDoctors from 'components/DeleteDoctors';
import Doctors from 'components/Doctors';
import HomePage from 'pages/HomePage';
import NotFoundPage from 'pages/NotFoundPage';

const NavigationLinks = () => {
  const location = useLocation();

  if (location.pathname === '/404') {
    return null;
  }

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/appointments">Appointments</Link>
      <Link to="/booking">Booking</Link>
      <Link to="/add-doctors">Add Doctor</Link>
      <Link to="/delete-doctors">Delete Doctor</Link>
    </nav>
  );
};

const App = () => (
  <Router>
    <NavigationLinks />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/add-doctors" element={<AddDoctors />} />
      <Route path="/delete-doctors" element={<DeleteDoctors />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate replace to="/404" />} />
    </Routes>
  </Router>
);

export default App;
