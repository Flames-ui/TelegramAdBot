// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.primary};
  padding: 10px 20px;
`;

const Logo = styled.h2`
  color: ${({ theme }) => theme.body};
  margin: 0;
  cursor: default;
`;

const NavLinks = styled.div`
  a, button {
    color: ${({ theme }) => theme.body};
    margin-left: 20px;
    text-decoration: none;
    font-weight: bold;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    padding: 0;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/login');
  };

  return (
    <Nav>
      <Logo>Anointed Flames</Logo>
      <NavLinks>
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/write">Write</Link>
            <button onClick={handleLogout} aria-label="Logout">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </NavLinks>
    </Nav>
  );
          }
