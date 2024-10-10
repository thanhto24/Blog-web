import React, { createContext, useState, useEffect } from 'react';

// Create PostContext
export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [relatedPosts, setRelatedPosts] = useState([]); // State for related posts
  const [postWithId, setPostWithId] = useState([]);
  const [postSearch, setpostSearch] = useState([]);
  
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

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const fetchRelatedPosts = async (relatedData) => {
    try {
      // Ensure relatedData is an array before joining
      if (!Array.isArray(relatedData)) {
        throw new Error('relatedData must be an array');
      }
  
      // Convert relatedData array to a comma-separated string for the query
      const query = relatedData.join(',');
  
      const response = await fetch(`http://localhost:5000/posts/related?data=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
  
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
  }

  // useEffect(() => {
  //   fetchPostById('66ff53cd07dde53c28d41837');
  // }, []);

  const fetchPostSearch = async (searchTerm) => {
    try {
      const response = await fetch(`http://localhost:5000/posts/search/${searchTerm}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setpostSearch(data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
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

  return (
    <PostContext.Provider value={{ posts, relatedPosts, postWithId, postSearch, fetchPostSearch, fetchAllPosts, fetchRelatedPosts, fetchPostById, createPost }}>
      {children}
    </PostContext.Provider>
  );
};
