import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get('https://localhost:44336/api/messages'); // Replace with your backend endpoint
        setMessage(response.data.message || 'Connection successful!');
      } catch (err) {
        setError('Failed to connect to the backend.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Home Page</h1>
      {error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        <div style={{ color: 'green' }}>{message}</div>
      )}
    </div>
  );
};

export default Home;
