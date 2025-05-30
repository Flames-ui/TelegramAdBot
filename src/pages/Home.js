// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // For editing posts
  const [editingPost, setEditingPost] = useState(null);
  const [editContent, setEditContent] = useState('');

  // Fetch posts from your API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('https://my-api-r1ts.onrender.com/posts');
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        alert('Error fetching posts: ' + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Delete post handler
  const handleDeleteClick = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      const res = await fetch(`https://my-api-r1ts.onrender.com/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${user.token}`, // Uncomment if your API requires auth token
        },
      });
      if (!res.ok) throw new Error('Failed to delete post');
      setPosts((prevPosts) => prevPosts.filter((p) => p.id !== postId));
    } catch (error) {
      alert('Error deleting post: ' + error.message);
    }
  };

  // Edit post handlers
  const handleEditClick = (post) => {
    setEditingPost(post);
    setEditContent(post.content);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (editContent.trim() === '') {
      alert('Post content cannot be empty.');
      return;
    }

    try {
      const res = await fetch(`https://my-api-r1ts.onrender.com/posts/${editingPost.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${user.token}`, // Uncomment if your API requires auth token
        },
        body: JSON.stringify({ content: editContent.trim() }),
      });
      if (!res.ok) throw new Error('Failed to update post');
      const updatedPost = await res.json();

      setPosts((prevPosts) =>
        prevPosts.map((p) => (p.id === updatedPost.id ? updatedPost : p))
      );

      setEditingPost(null);
      setEditContent('');
    } catch (error) {
      alert('Error updating post: ' + error.message);
    }
  };

  if (loading) return <p>Loading posts...</p>;

  return (
    <div style={{ maxWidth: 700, margin: '20px auto', padding: '0 15px' }}>
      <h1>Home Page (Feed)</h1>
      {user ? (
        <>
          <p>Welcome, {user.name}!</p>

          {posts.length === 0 && <p>No posts found.</p>}

          <ul style={{ listStyle: 'none', padding: 0 }}>
            {posts.map((post) => (
              <li
                key={post.id}
                style={{
                  marginBottom: 20,
                  paddingBottom: 15,
                  borderBottom: '1px solid #ccc',
                  backgroundColor: '#f9f9f9',
                  borderRadius: 8,
                  padding: 15,
                }}
              >
                <p style={{ whiteSpace: 'pre-wrap' }}>{post.content}</p>
                <small>
                  Posted by: {post.userName || 'Unknown'} | Post ID: {post.id}
                </small>

                {/* Show Edit/Delete only if user is admin or post owner */}
                {(user.role === 'admin' || user.id === post.userId) && (
                  <div style={{ marginTop: 10 }}>
                    <button
                      onClick={() => handleEditClick(post)}
                      style={{
                        marginRight: 10,
                        backgroundColor: '#4caf50',
                        color: 'white',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: 4,
                        cursor: 'pointer',
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(post.id)}
                      style={{
                        backgroundColor: '#ff4d4d',
                        color: 'white',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: 4,
                        cursor: 'pointer',
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Edit Modal */}
          {editingPost && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999,
              }}
            >
              <form
                onSubmit={handleEditSubmit}
                style={{
                  backgroundColor: '#fff',
                  padding: 20,
                  borderRadius: 8,
                  width: '90%',
                  maxWidth: 500,
                }}
              >
                <h2>Edit Post</h2>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows={5}
                  style={{ width: '100%', padding: 10, fontSize: 16 }}
                />
                <div style={{ marginTop: 10 }}>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: '#4caf50',
                      color: 'white',
                      padding: '10px 20px',
                      border: 'none',
                      borderRadius: 4,
                      cursor: 'pointer',
                      marginRight: 10,
                    }}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingPost(null)}
                    style={{
                      backgroundColor: '#999',
                      color: 'white',
                      padding: '10px 20px',
                      border: 'none',
                      borderRadius: 4,
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default Home;
