// src/components/Profile.js
import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const ProfileWrapper = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.body};
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const Info = styled.p`
  font-size: 1.2rem;
  margin-bottom: 15px;
`;

const LogoutButton = styled.button`
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.primary};
  padding: 10px 20px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.body};
  }
`;

export default function Profile() {
  const { user, logout } = useAuth();

  if (!user) return <p>Loading...</p>;

  return (
    <ProfileWrapper>
      <Title>Your Profile</Title>
      <Info><strong>Username:</strong> {user.name}</Info>
      {/* You can add more user info here */}

      <LogoutButton onClick={logout}>Logout</LogoutButton>
    </ProfileWrapper>
  );
}
