import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Menu from './pages/Menu'; 
import ProtectedRoute from './components/ProtectedRoute';
import authService from './services/authService';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            authService.isAuthenticated() ? 
              <Navigate to="/menu" replace /> : 
              <Navigate to="/login" replace />
          } 
        />

        <Route 
          path="/login" 
          element={
            authService.isAuthenticated() ? 
              <Navigate to="/menu" replace /> : 
              <Login />
          } 
        />
        <Route 
          path="/registro" 
          element={
            authService.isAuthenticated() ? 
              <Navigate to="/menu" replace /> : 
              <Registro />
          } 
        />
        <Route
          path="/menu"
          element={
            <ProtectedRoute>
              <Menu />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;