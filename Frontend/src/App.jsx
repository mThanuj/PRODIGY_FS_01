import './App.css'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Home from "./pages/Home"
import ProtectedRoute from './components/protectedRoutes'
import Login from './pages/login'
import Register from './pages/register'
function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
