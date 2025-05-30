// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Profile from './components/Profile';  // <-- imported Profile component

// Global styles
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: background-color 0.3s ease, color 0.3s ease;
  }
`;

const lightTheme = {
  body: '#f8f1e7',
  text: '#333333',
  primary: '#bfa14a',
  secondary: '#000000'
};

const darkTheme = {
  body: '#121212',
  text: '#f8f1e7',
  primary: '#d4af37',
  secondary: '#000000'
};

const PageWrapper = styled.div`
  padding: 20px;
`;

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

// Home Component
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

// Write Component (Full working form with API POST)
const Write = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setMessage('Please enter your post content.');
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('https://my-api-r1ts.onrender.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: content.trim() }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit post.');
      }

      setMessage('Post submitted successfully!');
      setContent('');
    } catch (error) {
      setMessage(error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <h1>Write a New Post</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your post content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={loading}
          style={{
            width: '100%',
            height: '150px',
            padding: '10px',
            fontSize: '1rem',
            marginBottom: '15px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            resize: 'vertical',
          }}
        />
        <br />
        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: '#bfa14a',
            color: 'white',
            border: 'none',
            padding: '12px 25px',
            cursor: loading ? 'not-allowed' : 'pointer',
            borderRadius: '4px',
            fontWeight: 'bold',
          }}
        >
          {loading ? 'Submitting...' : 'Submit Post'}
        </button>
      </form>
      {message && <p style={{ marginTop: '15px' }}>{message}</p>}
    </PageWrapper>
  );
};

// Login Component
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
    navigate('/');
  };

  if (user) return <Navigate to="/" />;

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

// Signup Component
const Signup = () => (
  <PageWrapper>
    <h1>Signup Page (Coming soon)</h1>
  </PageWrapper>
);

function App() {
  const [isDark, setIsDark] = useState(true);
  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <AuthProvider>
        <Router>
          <Navbar />
          <ToggleButton onClick={toggleTheme}>
            Switch to {isDark ? 'Light' : 'Dark'} Mode
          </ToggleButton>

          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/write"
              element={
                <PrivateRoute>
                  <Write />
                </PrivateRoute>
              }
            />
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
