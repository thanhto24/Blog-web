import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import CategorySite from './CategorySite'; // Assuming you move CategorySite to a separate file

const Header = ({ user, onLogin, onLogout }) => {
  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate('/create-post');
  };

  const handleSearch = (query) => {
    console.log('Searching for:', query);
    window.location.href = `/posts/search/${query}`;
  };

  return (
    <>
      <header className="flex items-center justify-between bg-white p-5 shadow-md">
        <a href="/" className="text-3xl font-bold">
          Home
        </a>
        <SearchBar onSearch={handleSearch} />
        <div className="flex items-center space-x-3">
          {user ? (
            <>
              <button
                className="flex items-center justify-center w-32 rounded-md bg-blue-500 px-4 py-2 text-white transition duration-200 hover:bg-blue-600"
                onClick={handleCreatePost}
              >
                Create Post
              </button>
              <button
                className="flex items-center justify-center w-32 rounded-md bg-blue-500 px-4 py-2 text-white transition duration-200 hover:bg-blue-600"
                onClick={onLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="flex items-center justify-center w-32 rounded-md bg-blue-500 px-4 py-2 text-white transition duration-200 hover:bg-blue-600"
                onClick={onLogin}
              >
                Login
              </button>
              <button className="flex items-center justify-center w-32 rounded-md bg-blue-500 px-4 py-2 text-white transition duration-200 hover:bg-blue-600">
                Sign Up
              </button>
            </>
          )}
        </div>
      </header>
      <CategorySite />
    </>
  );
};

export default Header;
