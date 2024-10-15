import React from 'react';
import { Link } from 'react-router-dom';

const ShortPost = ({ post, editMode = false }) => {
  const storedUser = localStorage.getItem('user');
  const email = storedUser ? JSON.parse(storedUser).email : '';
  
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedOwner = post.owner?.trim().toLowerCase();


  const editable = storedUser && trimmedEmail === trimmedOwner;

  const handleEdit = (e) => {
    e.preventDefault();
    console.log('Edit post:', post._id);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    console.log('Delete post:', post._id);
  };

  return (
    <div className="relative">
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

      {editMode && editable && (
        <div className="absolute top-2 right-2 flex space-x-2">
          <button
            onClick={handleEdit}
            className="p-1 text-blue-500 hover:text-blue-700"
            title="Edit Post"
          >
            ✏️
          </button>
          <button
            onClick={handleDelete}
            className="p-1 text-red-500 hover:text-red-700"
            title="Delete Post"
          >
            🗑️
          </button>
        </div>
      )}
    </div>
  );
};

export default ShortPost;
