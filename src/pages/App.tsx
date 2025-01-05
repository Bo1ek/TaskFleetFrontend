import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home'; 
import Backend from './Backend';
import NavBar from '../components/NavBar';
import Register from './Register';
import LoginPage from './LoginPage';
import TicketPage from './TicketPage';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from '../context/useAuth';
import ProtectedRoute from '../components/ProtectedRoute';
import ProfilePage from './ProfilePage';
import TicketDetailsPage from './TicketDetailsPage';
import CreateTicketPage from './CreateTicketPage';
import MyTickets from './MyTickets';

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
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/tickets" element={<ProtectedRoute><TicketPage /></ProtectedRoute>} />
      <Route path="/tickets/:ticketId" element={<ProtectedRoute><TicketDetailsPage /></ProtectedRoute>} />
      <Route path="/create-ticket" element={<ProtectedRoute><CreateTicketPage /></ProtectedRoute>} />
      <Route path="/myTickets" element={<ProtectedRoute><MyTickets /></ProtectedRoute>} />
      </Routes>
      <ToastContainer/>
  </UserProvider>
  </BrowserRouter>
  );
};

export default App;
