import React from 'react';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  return (
    <div className="mx-auto max-w-sm rounded-lg bg-gradient-to-b from-green-800 to-blue-600 p-6 shadow-md">
      <h2 className="mb-4 text-center text-2xl font-bold text-white">Your Profile</h2>
      <div className="flex flex-col space-y-3">
        <Link
          to={`/posts/search/your-post`}
          className="rounded-md bg-red-700 px-4 py-2 text-white text-center transition duration-200 hover:bg-blue-800"
        >
          Edit your post
        </Link>
        <Link
          to={`/posts/search/liked-posts`} // Change this to the appropriate path
          className="rounded-md bg-red-700 px-4 py-2 text-white text-center transition duration-200 hover:bg-blue-800"
        >
          View Post you like
        </Link>
        <Link
          to={`/user/follow/all`} // Change this to the appropriate path
          className="rounded-md bg-red-700 px-4 py-2 text-white text-center transition duration-200 hover:bg-blue-800"
        >
          View following authors
        </Link>
        <Link
          to={`/`} // Change this to the appropriate path
          className="rounded-md bg-gray-700 px-4 py-2 text-white text-center transition duration-200 hover:bg-gray-800"
        >
          Incoming Feature
        </Link>
        <Link
          to={`/`} // Change this to the appropriate path
          className="rounded-md bg-gray-700 px-4 py-2 text-white text-center transition duration-200 hover:bg-gray-800"
        >
          Incoming Feature
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
