import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const API_URL = 'https://my-api-r1ts.onrender.com/posts';

const Home = () => {
  const { user, logout } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts from API
  const fetchPosts = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPosts(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Delete post function (only admin or owner)
  const deletePost = async (postId, postUserId) => {
    if (!user) return;
    if (user.role !== 'admin' && user.id !== postUserId) {
      alert('You are not authorized to delete this post.');
      return;
    }
    try {
      const res = await fetch(`${API_URL}/${postId}`, { method: 'DELETE' });
      if (res.ok) {
        setPosts(posts.filter(post => post._id !== postId));
        alert('Post deleted successfully.');
      } else {
        alert('Failed to delete post.');
      }
    } catch (error) {
      alert('Error deleting post.');
    }
  };

  // Edit post function - redirect or open modal (simplified alert for now)
  const editPost = (postId, postUserId) => {
    if (!user) return;
    if (user.role !== 'admin' && user.id !== postUserId) {
      alert('You are not authorized to edit this post.');
      return;
    }
    alert(`You can now edit post with ID: ${postId} (Implement edit UI)`);
    // Here you can route to /write with postId to edit, or open a modal
  };

  if (loading) return <p>Loading posts...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Home Page (Feed)</h1>
      {user ? (
        <>
          <p>Welcome, {user.name} ({user.role})!</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>You are not logged in.</p>
      )}

      <hr />

      {posts.length === 0 && <p>No posts available.</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {posts.map(post => (
          <li
            key={post._id}
            style={{
              border: '1px solid #ccc',
              borderRadius: 8,
              marginBottom: 15,
              padding: 15,
              backgroundColor: '#fff'
            }}
          >
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p><i>Posted by: {post.userName || 'Unknown'}</i></p>

            {(user && (user.role === 'admin' || user.id === post.userId)) && (
              <>
                <button
                  onClick={() => editPost(post._id, post.userId)}
                  style={{ marginRight: 10 }}
                >
                  Edit
                </button>
                <button onClick={() => deletePost(post._id, post.userId)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
