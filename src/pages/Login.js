import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 400px;
  margin: 80px auto;
  background-color: ${({ theme }) => theme.body};
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
const Title = styled.h2`
  margin-bottom: 20px;
  color: ${({ theme }) => theme.primary};
  text-align: center;
`;
const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 4px;
  font-size: 1rem;
`;
const Button = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.body};
  width: 100%;
  padding: 12px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
  font-size: 1rem;
`;

const ErrorMsg = styled.p`
  color: red;
  margin-bottom: 15px;
`;

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    // Mock login
    const success = login(email, password);
    if (success) {
      navigate('/');
    } else {
      setError('Failed to login. Try again.');
    }
  };

  return (
    <Container>
      <Title>Login</Title>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoComplete="username"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <Button type="submit">Login</Button>
      </form>
      <p style={{ marginTop: '15px', textAlign: 'center' }}>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </Container>
  );
  
