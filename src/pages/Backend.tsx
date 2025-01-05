import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/styles';
import Loading from '../components/Loading';

const Backend: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchBackendMessage = async () => {
        try {
          const response = await axios.get('https://localhost:44336/api/messages');
          setMessage(response.data.message || 'Backend is connected properly');
        } catch (err) {
          setError('Failed to connect to the backend.');
        } finally {
          setLoading(false);
        }
      };

      fetchBackendMessage();
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading text="Loading data..." />;
  }

  return (
    <div style={styles.app}>
      <header style={styles.appHeader}>
        {error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <p style={{ color: 'green', fontSize: '1.5em' }}>{message}</p>
        )}
      </header>
    </div>
  );
};

export default Backend;
