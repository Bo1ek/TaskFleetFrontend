import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import homeStyles from '../styles/homeStyles';
import Loading from '../components/Loading';

const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading text="Loading Home Page..." />;
  }

  return (
    <div style={homeStyles.container}>
      <header style={homeStyles.header}>
        <h1 style={homeStyles.title}>Task Management System</h1>
        <p style={homeStyles.description}>
          Welcome to your ultimate task management tool designed for small transport businesses. Organize, assign, and track tasks effortlessly to keep your operations running smoothly.
        </p>
        <div style={homeStyles.buttonGroup}>
          <Link to="/register" style={homeStyles.button}>
            Get Started
          </Link>
          <Link to="/login" style={homeStyles.button}>
            Login
          </Link>
        </div>
      </header>
      <main style={homeStyles.featuresSection}>
        <h2 style={homeStyles.featuresTitle}>Key Features:</h2>
        <ul style={homeStyles.featuresList}>
          <li>✔ Task assignment and tracking</li>
          <li>✔ Real-time updates</li>
          <li>✔ User roles and permissions</li>
          <li>✔ Integration with backend API</li>
        </ul>
      </main>
      <footer style={homeStyles.footer}>
        &copy; {new Date().getFullYear()} Transport Task Manager. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
