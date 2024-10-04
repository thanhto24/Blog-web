import React, { useEffect, useState } from 'react';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
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
        setPosts(data); // Update state with fetched posts
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchAllPosts();
  }, []); // Empty dependency array to run only on mount

  return (
    <div className="mx-auto max-w-2xl p-4">
      <h1 className="mb-6 text-center text-3xl font-bold">Posts</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li
            key={post.id}
            className="rounded-lg border p-4 shadow-md transition-shadow hover:shadow-lg"
          >
            <h3 className="mb-2 text-xl font-semibold">{post.title}</h3>
            <pre className="whitespace-pre-wrap rounded bg-gray-100 p-2 text-rose-800">
              {post.body}
            </pre>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
