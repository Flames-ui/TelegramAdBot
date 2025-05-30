import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Global Styles to handle body background and font color based on theme
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: background-color 0.3s ease, color 0.3s ease;
  }
`;

// Define Light and Dark theme colors (Gold & Black based)
const lightTheme = {
  body: '#f8f1e7',      // light cream/goldish background
  text: '#333333',      // dark text
  primary: '#bfa14a',   // gold
  secondary: '#000000'  // black
};

const darkTheme = {
  body: '#121212',      // dark background
  text: '#f8f1e7',      // light text
  primary: '#d4af37',   // bright gold
  secondary: '#000000'  // black
};

// Container styling
const PageWrapper = styled.div`
  padding: 20px;
`;

// Button to toggle theme
const ToggleButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.body};
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin: 10px;
  border-radius: 4px;
  font-weight: bold;
`;

// Home page showing login status and logout button
const Home = () => {
  const { user, logout } = useAuth();

  return (
    <PageWrapper>
      <h1>Home Page (Feed)</h1>
      {user ? (
        <>
          <p>Welcome, {user.name}!</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>You are not logged in.</p>
      )}
    </PageWrapper>
  );
};

// Login page with simple form
const Login = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === '') {
      alert('Please enter your username');
      return;
    }
    login(username.trim());
    navigate('/'); // redirect to home after login
  };

  if (user) {
    // If already logged in, redirect to home
    return <Navigate to="/" />;
  }

  return (
    <PageWrapper>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username: <br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            autoFocus
            style={{ padding: '8px', marginTop: '5px', width: '250px' }}
          />
        </label>
        <br />
        <button
          type="submit"
          style={{
            marginTop: '15px',
            backgroundColor: '#bfa14a',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Login
        </button>
      </form>
    </PageWrapper>
  );
};

// Simple Signup placeholder
const Signup = () => (
  <PageWrapper>
    <h1>Signup Page (Coming soon)</h1>
  </PageWrapper>
);

function App() {
  // State to toggle theme
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <AuthProvider>
        <Router>
          <ToggleButton onClick={toggleTheme}>
            Switch to {isDark ? 'Light' : 'Dark'} Mode
          </ToggleButton>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
