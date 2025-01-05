import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../assets/logo.svg';
import styles from '../styles/styles';
import Loading from '../components/Loading'; 

const Backend: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showReactLogo, setShowReactLogo] = useState<boolean>(false);

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
          setShowReactLogo(true);
        }
      };

      fetchBackendMessage();
    }, 5000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={styles.app}>
      <header style={styles.appHeader}>
        {loading ? (
          <>
            <Loading />
            <p style={{ color: '#fff', fontSize: '1.5em', marginTop: '1em' }}>Loading data...</p>
          </>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <>
            {showReactLogo && (
              <img src={logo} alt="React Logo" style={{ width: '10em', height: '10em', marginBottom: '1em' }} />
            )}
            <p style={{ color: 'green', fontSize: '1.5em' }}>{message}</p>

          </>
        )}
      </header>
    </div>
  );
};

export default Backend;
