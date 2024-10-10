import React from 'react';
import { Link } from 'react-router-dom';
import newsDefault from '../../../assets/newsDefault.jpg';

const PopularPost = ({ listPost }) => {
  return (
    <div className="p-5">
      <h1 className="mb-5 text-3xl font-bold">Popular Posts</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {listPost.map((post) => (
          <Link to={`/posts/id/${post._id}`} key={post._id} className="rounded-lg border p-4 shadow-md bg-white hover:shadow-lg transition-shadow">
            <h3 className="mb-2 text-xl font-semibold">{post.title}</h3>
            <img
              src={post.thumbnail_url || newsDefault} // Use short-circuiting for cleaner code
              alt={post.title || 'Default image'} // Fallback alt text for accessibility
              className="mb-2 h-40 w-full rounded-lg object-cover"
            />
            {post.description && (
              <p className="mb-2 text-gray-600">{post.description}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularPost;
