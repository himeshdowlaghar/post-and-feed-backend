import { useState } from 'react';
import UploadForm from './components/UploadForm';
import PostList from './components/PostList';
import './App.css';

function App() {
  const [refreshPosts, setRefreshPosts] = useState(0);

  const handlePostUpload = () => {
    // Trigger PostList to refresh posts
    setRefreshPosts(prev => prev + 1);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Post & Feed</h1>
        <p>Share your moments with the world</p>
      </header>

      <main className="app-main">
        <section className="upload-section">
          <UploadForm onPostUpload={handlePostUpload} />
        </section>

        <section className="feed-section">
          <PostList refreshTrigger={refreshPosts} />
        </section>
      </main>

      <footer className="app-footer">
        <p>&copy; 2025 Post & Feed. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
