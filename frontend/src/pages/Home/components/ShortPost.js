import React from 'react';
import { Link } from 'react-router-dom';

const ShortPost = ({ post }) => {
  return (
    <Link to={`/posts/id/${post._id}`} className="block rounded-lg border p-4 shadow-md bg-gray-200 hover:bg-gray-300 transition-colors">
      <h3 className="mb-2 text-xl font-semibold">{post.title}</h3>
      {post.description && (
        <p className="mb-2 text-gray-600">{post.description}</p>
      )}
    </Link>
  );
};

export default ShortPost;
