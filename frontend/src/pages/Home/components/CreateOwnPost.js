import React from 'react';
import { Link } from 'react-router-dom';

const CreateOwnPost = () => {
  return (
    <Link
      to={'/create-post'}
      className="mx-auto mb-10 flex w-3/4 items-center justify-between rounded-lg border border-gray-300 bg-white p-6 italic shadow-md transition duration-200 hover:shadow-lg"
    >
      <h2 className="flex-grow text-center text-3xl font-extrabold text-gray-800">
        Create Your Own Post Now
      </h2>
      <span className="ml-4 text-2xl text-blue-500">➔</span>{' '}
      {/* Arrow on the right */}
    </Link>
  );
};

export default CreateOwnPost;
