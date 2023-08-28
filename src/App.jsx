import {
  Link, Route, BrowserRouter as Router, Routes,
} from 'react-router-dom';
import AddDoctors from './components/AddDoctors';
import Appointments from './components/Appointments';
import Booking from './components/Booking';
import DeleteDoctors from './components/DeleteDoctors';
import Doctors from './components/Doctors';

function NoMatch() {
  return (
    <div>
      <h2>404: Page Not Found</h2>
      <p>Please check the URL.</p>
    </div>
  );
}

const App = () => (
  <Router>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/appointments">Appointments</Link>
      <Link to="/booking">Booking</Link>
      <Link to="/add-doctors">Add Doctor</Link>
      <Link to="/delete-doctors">Delete Doctor</Link>
    </nav>
    <Routes>
      <Route path="/" element={<Doctors />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/add-doctors" element={<AddDoctors />} />
      <Route path="/delete-doctors" element={<DeleteDoctors />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  </Router>
);

export default App;
