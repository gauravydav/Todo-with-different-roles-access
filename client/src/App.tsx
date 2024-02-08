import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './index.css'
import Todo from './components/todo/Todo'
import Error from './components/404error/404error'

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path="/todo" element={isAuthenticated ? <Todo /> : <Navigate to="/error" />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Navigate to="/error" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
