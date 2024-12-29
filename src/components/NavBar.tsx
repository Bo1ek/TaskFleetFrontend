import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/styles';

const NavBar: React.FC = () => {
  return (
    <nav style={styles.nav}>
      <a href="/" style={styles.navLink}>Home</a>
      <a href="/backend" style={styles.navLink}>Backend</a>
      <a href="/register" style={styles.navLink}>Register</a>
      <a href="/login" style={styles.navLink}>Login</a>
    </nav>
  );
};

export default NavBar;
