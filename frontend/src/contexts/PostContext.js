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
  const [needFetch, setNeedFetch] = useState(true); // State to control data fetching

  const storedUser = localStorage.getItem('user');
  const userEmail = storedUser ? JSON.parse(storedUser).email : '';

  const fetchUserPosts = async (email) => {
    try {
      const response = await fetch(`https://blog-web-be.vercel.app/posts/your-post/${email||userEmail}`, {
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
      const response = await fetch('https://blog-web-be.vercel.app/posts', {
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
    // Ensure relatedData is valid
    if (!Array.isArray(relatedData) || relatedData.length === 0) {
      // console.error("relatedData must be a non-empty array");
      return;
    }
  
    try {
      const query = relatedData.join(',');
  
      const response = await fetch(
        `https://blog-web-be.vercel.app/posts/related?data=${query}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
  
      if (Array.isArray(data)) {
        setRelatedPosts(data);
      } else {
        throw new Error('Unexpected response format: expected an array');
      }
    } catch (error) {
      console.error('Error fetching related posts:', error);
    }
  };
  

  const fetchPostById = async (id) => {
    try {
      const response = await fetch(`https://blog-web-be.vercel.app/posts/id/${id}`, {
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
        `https://blog-web-be.vercel.app/posts/search/${searchTerm}`,
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
      const response = await fetch('https://blog-web-be.vercel.app/users/liked-posts', {
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
      const response = await fetch('https://blog-web-be.vercel.app/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Error creating post');
      }

      const newPost = await response.json();
      setPosts((prevPosts) => [...prevPosts, newPost]);
      setNeedFetch(true); // Set needFetch to true to refresh posts
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const updatePost = async (id, postData) => {
    try {
      const response = await fetch(`https://blog-web-be.vercel.app/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Error updating post');
      }

      const updatedPost = await response.json();
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === updatedPost._id ? updatedPost : post))
      );
      setNeedFetch(true); // Set needFetch to true to refresh posts
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const deletePost = async (id) => {
    try {
      const response = await fetch(`https://blog-web-be.vercel.app/posts/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Error deleting post');
      }

      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
      setNeedFetch(true); // Set needFetch to true to refresh posts
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  useEffect(() => {
    if (needFetch) {
      fetchAllPosts();
      fetchUserPosts();
      fetchUserLikedPosts();
    }
    setNeedFetch(false); // Reset needFetch after fetching data
  }, [needFetch]); // Re-fetch data when needFetch changes

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
        updatePost,
        deletePost,
        setNeedFetch, // Expose setNeedFetch to components if needed
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
