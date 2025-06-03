import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Middleware from './components/Middleware';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AssignTask from './pages/AssignTask';
import ViewTasks from './pages/ViewTasks';
import TaskLayout from './components/TaskLayout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Middleware />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<TaskLayout />}>
            <Route path="/assign-task" element={<AssignTask />} />
            <Route path="/view-tasks" element={<ViewTasks />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
