import React from 'react';
import { Link } from 'react-router-dom';

const ShortPost = ({ post }) => {
  return (
    <Link
      to={`/posts/id/${post._id}`}
      className="block h-[150px] overflow-hidden rounded-lg border bg-gray-200 p-4 pr-6 shadow-md transition-colors hover:bg-gray-300"
    >
      <h3 className="mb-2 overflow-hidden text-xl font-semibold">
        {post.title}
      </h3>
      {post.description && (
        <p className="mb-2 overflow-hidden text-gray-600">{post.description}</p>
      )}
    </Link>
  );
};

export default ShortPost;
