import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import HomePage from 'pages/HomePage';
import NotFoundPage from 'pages/NotFoundPage';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);

export default App;
