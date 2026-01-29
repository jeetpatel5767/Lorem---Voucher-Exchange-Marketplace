import './App.css'
import LandingPage from './landing'
import Login from './Components/Login/Login'
import Dashboard from './Components/Dasboard/Dashboard';
import ProtectedRoute from './Components/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/Login' element={<Login/>} />
        <Route 
          path='/Dashboard' 
          element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  )
}

export default App