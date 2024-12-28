import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('https://localhost:44336/api/messages')
      .then(response => {
        setMessage(response.data.message); 
      })
      .catch(error => {
        console.error('Error:', error);
        setMessage('Failed to fetch data from backend');
      });
  }, []);

  return (
    <div>
      <h1>Message from Backend:</h1>
      <p>{message}</p>
    </div>
  );
};

export default App;
