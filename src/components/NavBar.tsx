import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/styles';
import { useAuth } from '../context/useAuth';

const NavBar: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const { isLoggedIn, logout } = useAuth();

  useEffect(() => {
    setIsAuthenticated(isLoggedIn());
  }, [isLoggedIn]);

  return (
    <nav style={styles.nav}>
      <a href="/" style={styles.navLink}>Home</a>
      <a href="/backend" style={styles.navLink}>Backend</a>
      <a href="/tickets" style={styles.navLink}>Tickets</a>
      {isAuthenticated && <a href="/profile" style={styles.navLink}>Profile</a>}
      {!isAuthenticated && <a href="/login" style={styles.navLink}>Login</a>}
      {!isAuthenticated && <a href="/register" style={styles.navLink}>Register</a>}
      {isAuthenticated && (<a href="#" style={styles.navLink}
      onClick={(e) => { e.preventDefault(); logout();}}> Logout </a>
      )}
    </nav>
  );
};

export default NavBar;
