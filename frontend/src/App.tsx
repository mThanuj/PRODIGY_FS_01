import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Middleware from './components/Middleware';
import Home from './pages/Home';
import Login from './pages/Login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<Middleware />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
