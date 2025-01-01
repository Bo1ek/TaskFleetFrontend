import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home'; 
import Backend from './Backend';
import NavBar from '../components/NavBar';
import Register from './Register';
import LoginPage from './LoginPage';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from '../context/useAuth';
import ProtectedRoute from '../components/ProtectedRoute';

const App: React.FC = () => {
  return (
  <BrowserRouter>
  <UserProvider>
    <NavBar/>
    <Routes>
      <Route path="/backend" element={<ProtectedRoute><Backend /></ProtectedRoute>} />
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<LoginPage />} />
      </Routes>
      <ToastContainer/>
  </UserProvider>
  </BrowserRouter>
  );
};

export default App;
