import axios from 'axios';

const API_BASE_URL = 'http://localhost:3456';

const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch all posts
export const fetchPosts = async () => {
  try {
    const response = await apiService.get('/posts');
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

// Upload a new post
export const uploadPost = async (formData) => {
  try {
    const response = await apiService.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading post:', error);
    throw error;
  }
};

// Delete a post
export const deletePost = async (postId) => {
  try {
    const response = await apiService.delete(`/delete/${postId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

export default apiService;
