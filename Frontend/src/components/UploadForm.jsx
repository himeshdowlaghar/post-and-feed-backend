import { useState } from 'react';
import { uploadPost } from '../services/apiService';
import '../styles/UploadForm.css';

function UploadForm({ onPostUpload }) {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
    }
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!file) {
      setError('Please select an image');
      return;
    }
    
    if (!caption.trim()) {
      setError('Please enter a caption');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('image', file);
      formData.append('caption', caption);

      // Upload the post
      const response = await uploadPost(formData);
      
      setSuccess('Post uploaded successfully!');
      setFile(null);
      setCaption('');
      
      // Reset file input
      document.querySelector('input[type="file"]').value = '';
      
      // Notify parent component to refresh posts
      if (onPostUpload) {
        onPostUpload();
      }

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload post. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-form-container">
      <h2>Share Your Post</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label htmlFor="image">Select Image *</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
            required
          />
          {file && <p className="file-name">Selected: {file.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="caption">Caption *</label>
          <textarea
            id="caption"
            placeholder="Write a caption for your post..."
            value={caption}
            onChange={handleCaptionChange}
            disabled={loading}
            rows={4}
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <button
          type="submit"
          className="submit-btn"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload Post'}
        </button>
      </form>
    </div>
  );
}

export default UploadForm;
