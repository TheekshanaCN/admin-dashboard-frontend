import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Routes>

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path="dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="users"
          element={token ? <Users /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />

    </Routes>
  );
}

export default App;
