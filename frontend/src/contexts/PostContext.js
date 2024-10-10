import React, { createContext, useState, useEffect } from 'react';

// Create PostContext
export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [relatedPosts, setRelatedPosts] = useState([]); // State for related posts
  const [postWithId, setPostWithId] = useState([]);

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

  const fetchRelatedPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/posts/related', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setRelatedPosts(data); // Store related posts separately
    } catch (error) {
      console.error('Failed to fetch related posts:', error);
    }
  };

  const fetchPostById = async function (id) {
    try {
      const response = await fetch(`http://localhost:5000/posts/${id}`, {
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
    <PostContext.Provider value={{ posts, relatedPosts, postWithId, fetchAllPosts, fetchRelatedPosts, fetchPostById, createPost }}>
      {children}
    </PostContext.Provider>
  );
};
