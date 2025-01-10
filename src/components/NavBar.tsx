import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/styles';
import { useAuth } from '../context/useAuth';

const NavBar: React.FC = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const { isLoggedIn, logout } = useAuth();
  const isAuthenticated = isLoggedIn();

  return (
    <nav style={styles.nav}>
      <div>
        <Link
          to="/"
          style={{ ...styles.navLink, ...(hoveredLink === 'Home' ? styles.navLinkHover : {}) }}
          onMouseEnter={() => setHoveredLink('Home')}
          onMouseLeave={() => setHoveredLink(null)}>
          Home
        </Link>
        <Link
          to="/backend"
          style={{ ...styles.navLink, ...(hoveredLink === 'Backend' ? styles.navLinkHover : {}) }}
          onMouseEnter={() => setHoveredLink('Backend')}
          onMouseLeave={() => setHoveredLink(null)}>
          Backend
        </Link>
        <Link
          to="/tickets"
          style={{ ...styles.navLink, ...(hoveredLink === 'Tickets' ? styles.navLinkHover : {}) }}
          onMouseEnter={() => setHoveredLink('Tickets')}
          onMouseLeave={() => setHoveredLink(null)}>
          Tickets
        </Link>
        <Link
          to="/map"
          style={{ ...styles.navLink, ...(hoveredLink === 'Map' ? styles.navLinkHover : {}) }}
          onMouseEnter={() => setHoveredLink('Map')}
          onMouseLeave={() => setHoveredLink(null)}>
          Map
        </Link>
        {isAuthenticated && (
          <>
            <Link
              to="/MyTickets"
              style={{ ...styles.navLink, ...(hoveredLink === 'MyTickets' ? styles.navLinkHover : {}) }}
              onMouseEnter={() => setHoveredLink('MyTickets')}
              onMouseLeave={() => setHoveredLink(null)}>
              My Tickets
            </Link>
            <Link
              to="/management"
              style={{ ...styles.navLink, ...(hoveredLink === 'Management' ? styles.navLinkHover : {}) }}
              onMouseEnter={() => setHoveredLink('Management')}
              onMouseLeave={() => setHoveredLink(null)}>
              Management
            </Link>
          </>
        )}
      </div>
      <div>
        {isAuthenticated && (
          <Link
            to="/profile"
            style={{ ...styles.navLink, ...(hoveredLink === 'Profile' ? styles.navLinkHover : {}) }}
            onMouseEnter={() => setHoveredLink('Profile')}
            onMouseLeave={() => setHoveredLink(null)}>
            Profile
          </Link>
        )}
        {!isAuthenticated && (
          <>
            <Link
              to="/login"
              style={{ ...styles.navLink, ...(hoveredLink === 'Login' ? styles.navLinkHover : {}) }}
              onMouseEnter={() => setHoveredLink('Login')}
              onMouseLeave={() => setHoveredLink(null)}>
              Login
            </Link>
            <Link
              to="/register"
              style={{ ...styles.navLink, ...(hoveredLink === 'Register' ? styles.navLinkHover : {}) }}
              onMouseEnter={() => setHoveredLink('Register')}
              onMouseLeave={() => setHoveredLink(null)}>
              Register
            </Link>
          </>
        )}
        {isAuthenticated && (
          <button
            style={{ ...styles.navButton, ...(hoveredLink === 'Logout' ? styles.navButtonHover : {}) }}
            onMouseEnter={() => setHoveredLink('Logout')}
            onMouseLeave={() => setHoveredLink(null)}
            onClick={() => logout()}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
