import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

// These styles change the background and text color depending on dark or light mode
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: background-color 0.3s ease, color 0.3s ease;
  }
`;

// Light (gold & black) theme colors
const lightTheme = {
  body: '#f8f1e7',      // cream/gold background
  text: '#333333',      // dark text
  primary: '#bfa14a',   // gold
  secondary: '#000000'  // black
};

// Dark (gold & black) theme colors
const darkTheme = {
  body: '#121212',      // dark background
  text: '#f8f1e7',      // light text
  primary: '#d4af37',   // bright gold
  secondary: '#000000'  // black
};

// Simple page wrapper styling
const PageWrapper = styled.div`
  padding: 20px;
`;

// This button lets users switch between dark and light mode
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

// Simple Home page content
const Home = () => <PageWrapper><h1>Home Page (Feed)</h1></PageWrapper>;

// Simple Login page content
const Login = () => <PageWrapper><h1>Login Page</h1></PageWrapper>;

// Simple Signup page content
const Signup = () => <PageWrapper><h1>Signup Page</h1></PageWrapper>;

function App() {
  // This controls if dark mode is ON or OFF
  const [isDark, setIsDark] = useState(true);

  // This changes dark mode on/off
  const toggleTheme = () => setIsDark(prev => !prev);

  return (
    // Set the theme based on isDark value
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Router>
        {/* Button for switching theme */}
        <ToggleButton onClick={toggleTheme}>
          Switch to {isDark ? 'Light' : 'Dark'} Mode
        </ToggleButton>

        {/* Define routes (pages) */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
