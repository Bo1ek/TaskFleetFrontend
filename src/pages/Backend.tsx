import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../assets/logo.svg';
import styles from '../styles/styles';

const Backend: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check backend connection
    const fetchBackendMessage = async () => {
      try {
        const response = await axios.get('https://localhost:44336/api/messages');
        setMessage(response.data.message || 'Backend connection successful!');
      } catch (err) {
        setError('Failed to connect to the backend.');
      } finally {
        setLoading(false);
      }
    };

    fetchBackendMessage();
  }, []);

  return (
    <div style={styles.app}>
      <header style={styles.appHeader}>
        <img src={logo} style={styles.appLogo} alt="logo" />
        {loading ? (
          <p>Checking backend connection...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <p style={{ color: 'green' }}>{message}</p>
        )}
        <a
          style={styles.appLink}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default Backend;
