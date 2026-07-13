import { createContext, useContext, useState } from 'react';

const PostContext = createContext();

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addPost = (post) => {
    setPosts([...posts, post]);
  };

  const clearError = () => {
    setError('');
  };

  return (
    <PostContext.Provider value={{ 
      posts, 
      setPosts, 
      loading, 
      setLoading, 
      error, 
      setError,
      addPost,
      clearError
    }}>
      {children}
    </PostContext.Provider>
  );
}

// Custom hook to use PostContext
export function usePost() {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePost must be used within PostProvider');
  }
  return context;
}