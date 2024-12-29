import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home'; // Adjust path as needed
import Backend from './Backend';
import NavBar from '../components/NavBar';
import Register from './Register';
import Login from './Login';

const App: React.FC = () => {
  return (
    <BrowserRouter>
    <NavBar/>
      <Routes>
      <Route path="/backend" element={<Backend />} />
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
