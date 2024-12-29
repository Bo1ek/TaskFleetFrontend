import React from 'react';
import styles from '../styles/styles';
import NavBar from '../components/NavBar';

const Home: React.FC = () => {
  return (
    <div style={styles.app}>
      <header style={styles.appHeader}>
        <h1 style ={styles.homeHeader}>Welcome to the Home Page</h1>
        <p style={styles.homeParagraph}>
          This is the main landing page of the application. Navigate to the
          <a href="/backend" style={{ ...styles.appLink, ...styles.homeLink }}> Backend Check </a>
          page to test the backend connection.
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
};

export default Home;
