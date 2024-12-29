import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/styles'; 

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'User', // Default role; 
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic password confirmation validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post('https://localhost:44336/api/Accounts/register', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      if (response.status === 200) {
        setMessage(response.data.message);
        setError('');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: 'User',
        });
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      setMessage('');
    }
  };

  return (
    <div style={styles.app}>
      <div style={styles.formContainer}>
        <h1 style={styles.formTitle}>Register</h1>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Role:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              style={styles.select}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>
        {message && <p style={styles.successMessage}>{message}</p>}
        {error && <p style={styles.errorMessage}>{error}</p>}
      </div>
    </div>
  );
};

export default Register;
