// src/components/Write.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const PageWrapper = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  max-width: 600px;
  margin-top: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 140px;
  padding: 10px;
  margin-bottom: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.body};
  border: none;
  padding: 12px 24px;
  font-weight: 700;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;

  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
`;

const ErrorMsg = styled.p`
  color: red;
  font-weight: 600;
`;

const SuccessMsg = styled.p`
  color: green;
  font-weight: 600;
`;

function Write() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!title.trim() || !content.trim()) {
      setError('Both title and content are required.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://my-api-r1ts.onrender.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,  // assuming user.token holds auth token
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          authorId: user.id,  // send user id as author
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to create post.');
      }

      setSuccess('Post created successfully! Redirecting...');
      setTitle('');
      setContent('');

      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <h1>Write a New Post</h1>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          type="text"
          placeholder="Enter post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />

        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          placeholder="Write your post content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={loading}
        />

        {error && <ErrorMsg>{error}</ErrorMsg>}
        {success && <SuccessMsg>{success}</SuccessMsg>}

        <Button type="submit" disabled={loading}>
          {loading ? 'Posting...' : 'Post'}
        </Button>
      </Form>
    </PageWrapper>
  );
}

export default Write
