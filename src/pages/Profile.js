import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  background-color: ${({ theme }) => theme.body};
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  overflow: hidden;
`;

const CoverPhoto = styled.div`
  height: 200px;
  background: linear-gradient(to right, #bfa14a, #000);
`;

const ProfileDetails = styled.div`
  padding: 20px;
  text-align: center;
`;

const ProfilePicture = styled.div`
  margin-top: -60px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.primary};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: #fff;
  font-weight: bold;
  border: 4px solid ${({ theme }) => theme.body};
`;

const Bio = styled.p`
  margin-top: 15px;
  font-size: 16px;
  color: ${({ theme }) => theme.text};
`;

const Profile = () => {
  const { user } = useAuth();

  if (!user) return <p>Loading profile...</p>;

  const initials = user.name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();

  return (
    <ProfileContainer>
      <CoverPhoto />
      <ProfileDetails>
        <ProfilePicture>{initials}</ProfilePicture>
        <h2>{user.name}</h2>
        <Bio>This is your bio. You can edit this soon!</Bio>
      </ProfileDetails>
    </ProfileContainer>
  );
};

export default Profile;
