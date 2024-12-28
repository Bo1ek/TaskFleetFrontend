import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import styles from './styles';

function App() {
  const [message, setMessage] = useState<string>(''); 

  useEffect(() => {
    // Pobierz wiadomość z backendu
    axios.get('https://localhost:44336/api/messages')
      .then((response) => {
        setMessage(response.data.message); // Zapisz wiadomość w stanie
      })
      .catch((error) => {
        console.error('Error fetching message:', error);
        setMessage('Failed to load message from backend');
      });
  }, []);

  return (
    <div style={styles.app}>
      <header style={styles.appHeader}>
        <img src={logo} style={styles.appLogo} alt="logo" />
        <p>
          {message ? message : 'Loading message from backend...'}
        </p>
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
}

export default App;
