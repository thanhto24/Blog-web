import React, { useContext, useEffect } from 'react';
import { PostContext } from '../contexts/PostContext';

const PostList = () => {
  const {posts} = useContext(PostContext);

  return (
    <div className="mx-auto max-w-2xl p-4">
      <h1 className="mb-6 text-center text-3xl font-bold">Posts</h1>
      <ul className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <li key={post._id} className="rounded-lg border p-4 shadow-md">
              <h3 className="mb-2 text-xl font-semibold">{post.title}</h3>
              <pre className="whitespace-pre-wrap rounded bg-gray-100 p-2">
                {post.body}
              </pre>
            </li>
          ))
        ) : (
          <p>No posts found</p>
        )}
      </ul>
    </div>
  );
};

export default PostList;
