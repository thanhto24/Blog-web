import React, { createContext, useState, useEffect } from 'react';

// Create PostContext
export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [relatedPosts, setRelatedPosts] = useState([]); // State for related posts
  const [postWithId, setPostWithId] = useState([]);
  const [postSearch, setpostSearch] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [userLikedPosts, setUserLikedPosts] = useState([]);

  const storedUser = localStorage.getItem('user');
  const userEmail = storedUser ? JSON.parse(storedUser).email : '';

  const fetchUserPosts = async () => {
    try {
      const response = await fetch(`http://localhost:5000/posts/your-post/${userEmail}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setUserPosts(data);
    } catch (error) {
      console.error('Failed to fetch user posts:', error);
    }
  };

  const fetchAllPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/posts', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  const fetchRelatedPosts = async (relatedData) => {
    try {
      // Ensure relatedData is an array before joining
      if (!Array.isArray(relatedData)) {
        throw new Error('relatedData must be an array');
      }

      // Convert relatedData array to a comma-separated string for the query
      const query = relatedData.join(',');

      const response = await fetch(
        `http://localhost:5000/posts/related?data=${encodeURIComponent(query)}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Ensure data is in the expected format before updating state
      if (Array.isArray(data)) {
        setRelatedPosts(data); // Store related posts separately
      } else {
        throw new Error('Unexpected response format: expected an array');
      }
    } catch (error) {
      console.error('Failed to fetch related posts:', error);
      // Optionally handle error state here, e.g., set an error message in state
    }
  };

  const fetchPostById = async function (id) {
    try {
      const response = await fetch(`http://localhost:5000/posts/id/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setPostWithId(data);
    } catch (error) {
      console.error('Failed to fetch post:', error);
    }
  };

  const fetchPostSearch = async (searchTerm) => {
    try {
      const response = await fetch(
        `http://localhost:5000/posts/search/${searchTerm}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setpostSearch(data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  const fetchUserLikedPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/users/liked-posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setUserLikedPosts(data);
    } catch (error) {
      console.error('Failed to fetch user liked posts:', error);
    }
  };

  const createPost = async (postData) => {
    try {
      const response = await fetch('http://localhost:5000/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Error creating post');
      }

      const newPost = await response.json();
      setPosts((prevPosts) => [...prevPosts, newPost]);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  useEffect(() => {
    fetchAllPosts();
    fetchUserPosts();
    fetchUserLikedPosts();
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        relatedPosts,
        setRelatedPosts,
        postWithId,
        setPostWithId,
        postSearch,
        setpostSearch,
        userPosts,
        setUserPosts,
        userLikedPosts,
        setUserLikedPosts,
        fetchAllPosts,
        fetchRelatedPosts,
        fetchPostById,
        fetchPostSearch,
        fetchUserPosts,
        fetchUserLikedPosts,
        createPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
