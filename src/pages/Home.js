import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HomeWrapper = styled.div`
  max-width: 600px;
  margin: 30px auto;
  background-color: ${({ theme }) => theme.body};
  padding: 20px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.primary};
`;

const Welcome = styled.h2`
  color: ${({ theme }) => theme.primary};
`;

const LogoutButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.body};
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
`;

const Post = styled.div`
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.text};
  margin-top: 20px;
  padding: 10px;
  border-radius: 8px;
`;

function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login'); // redirect if not logged in
    return null;
  }

  return (
    <HomeWrapper>
      <Welcome>Welcome, {user.name}!</Welcome>
      <LogoutButton onClick={() => { logout(); navigate('/login'); }}>
        Logout
      </LogoutButton>

      <Post>
        <strong>Post 1:</strong> Jesus is Lord! 🙌
      </Post>
      <Post>
        <strong>Post 2:</strong> Remember to walk in love today 💛
      </Post>
    </HomeWrapper>
  );
}

export default Home;
