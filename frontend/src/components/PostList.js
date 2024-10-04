import React, { useEffect, useState } from "react";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/posts", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setPosts(data); // Update state with fetched posts
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchAllPosts();
  }, []); // Empty dependency array to run only on mount

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <pre>{post.body}</pre>
          </li>

          // Adjust according to your post structure
        ))}
      </ul>
    </div>
  );
};

export default PostList;
