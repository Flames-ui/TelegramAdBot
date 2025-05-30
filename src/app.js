import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

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

// Simple placeholder pages
const Home = () => <PageWrapper><h1>Home Page (Feed)</h1></PageWrapper>;
const Login = () => <PageWrapper><h1>Login Page</h1></PageWrapper>;

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

function App() {
  // State to toggle theme
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark(prev => !prev);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Router>
        <ToggleButton onClick={toggleTheme}>
          Switch to {isDark ? 'Light' : 'Dark'} Mode
        </ToggleButton>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App
