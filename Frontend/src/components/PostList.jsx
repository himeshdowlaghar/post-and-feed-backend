import { useState, useEffect } from 'react';
import { fetchPosts, deletePost } from '../services/apiService';
import '../styles/PostList.css';

function PostList({ refreshTrigger }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(null);

  // Fetch posts from backend
  const loadPosts = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchPosts();
      setPosts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to load posts. Please try again.');
      console.error('Fetch error:', err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // Load posts on component mount and when refreshTrigger changes
  useEffect(() => {
    loadPosts();
  }, [refreshTrigger]);

  // Handle post deletion
  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    setDeleting(postId);
    try {
      await deletePost(postId);
      // Remove deleted post from state
      setPosts(posts.filter(post => post._id !== postId));
    } catch (err) {
      setError('Failed to delete post. Please try again.');
      console.error('Delete error:', err);
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }

  return (
    <div className="post-list-container">
      <h2>Feed</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      {posts.length === 0 ? (
        <div className="no-posts">
          <p>No posts yet. Be the first to share!</p>
        </div>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <div key={post._id} className="post-card">
              <div className="post-image">
                <img 
                  src={post.image} 
                  alt={post.caption}
                  loading="lazy"
                />
              </div>
              <div className="post-content">
                <p className="post-caption">{post.caption}</p>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(post._id)}
                  disabled={deleting === post._id}
                >
                  {deleting === post._id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PostList;
