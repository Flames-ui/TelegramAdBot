import React, { useState } from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
  padding: 20px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  font-size: 1rem;
  margin-bottom: 15px;
  border-radius: 4px;
  border: 1px solid #ccc;
  resize: vertical;
`;

const SubmitButton = styled.button`
  background-color: #bfa14a;
  color: white;
  border: none;
  padding: 12px 25px;
  cursor: pointer;
  border-radius: 4px;
  font-weight: bold;

  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
`;

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
        <TextArea
          placeholder="Write your post content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={loading}
        />
        <br />
        <SubmitButton type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Post'}
        </SubmitButton>
      </form>
      {message && <p style={{ marginTop: '15px' }}>{message}</p>}
    </PageWrapper>
  );
};

export default Write;
