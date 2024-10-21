import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const UserSetting = ({ handleToggleSetting }) => {
  const settingRef = useRef(null);

  // Detect clicks outside of the UserSetting component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingRef.current && !settingRef.current.contains(event.target)) {
        handleToggleSetting(); // Close the settings if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleToggleSetting]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Centered content */}
      <div
        ref={settingRef}
        className="relative mx-auto max-w-sm rounded-lg bg-gradient-to-b from-green-800 to-blue-600 p-6 shadow-md"
      >
        <h2 className="mb-4 text-center text-2xl font-bold text-white">Your Profile</h2>
        <div className="flex flex-col space-y-3">
        <Link
          to={'/posts/search/your-post'}
          className="rounded-md bg-red-700 px-4 py-2 text-white text-center transition duration-200 hover:bg-blue-800"
        >
          Edit your post
        </Link>
        <Link
          to={'/posts/search/liked-posts'} // Change this to the appropriate path
          className="rounded-md bg-red-700 px-4 py-2 text-white text-center transition duration-200 hover:bg-blue-800"
        >
          View Post you like
        </Link>
        <Link
          to={'/user/follow/all'} // Change this to the appropriate path
          className="rounded-md bg-red-700 px-4 py-2 text-white text-center transition duration-200 hover:bg-blue-800"
        >
          View following authors
        </Link>
        <Link
          to={'/'} // Change this to the appropriate path
          className="rounded-md bg-gray-700 px-4 py-2 text-white text-center transition duration-200 hover:bg-gray-800"
        >
          Incoming Feature
        </Link>
        </div>
      </div>
    </div>
  );
};

export default UserSetting;
