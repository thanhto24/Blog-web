import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import CategorySite from './CategorySite';

const Header = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // State for storing the JWT token
  const navigate = useNavigate();

  // Function to handle Google login
  const handleGoogleLogin = () => {
    window.location.href = 'https://blog-web-be-a7k7.onrender.com/auth/google'; // Redirect to the backend route for Google login
  };

  // Logout function
  const handleLogout = () => {
    setUser(null); // Reset the user state to null
    setToken(null); // Clear the token from the state
    localStorage.removeItem('user'); // Remove user data from local storage
    navigate('/'); // Redirect to home or login page
  };

  // Function to decode the JWT token
  const decodedToken = async (token) => {
    try {
      const response = await fetch('https://blog-web-be-a7k7.onrender.com/auth/decodeToken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }), // Send token in the body
      });

      // Check if the response is OK and handle parsing
      if (!response.ok) {
        throw new Error('Failed to decode token');
      }

      const data = await response.json(); // Parse JSON response
      return data; // Return the parsed JSON data
    } catch (error) {
      console.error('Error decoding token:', error);
      return null; // Return null if there's an error
    }
  };

  useEffect(() => {
    const handleUser = async () => {
      const params = new URLSearchParams(window.location.search);
      const tokenFromUrl = params.get('token'); // Get the token from the URL

      if (tokenFromUrl) {
        // console.log('Token from URL:', tokenFromUrl);
        const decoded = await decodedToken(tokenFromUrl);
        if (decoded) {
          setToken(tokenFromUrl); // Store the token in state
          const userData = {
            username: decoded.username,
            profilePic: decoded.profilePic,
            email: decoded.email,
          };
          setUser(userData); // Set the user state

          // Save user data to local storage
          localStorage.setItem('user', JSON.stringify(userData));

          // After setting the user, navigate to the home page
          navigate('/'); // Redirect to the home page
        }
      } else {
        // Retrieve user data from local storage if token not found
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser)); // Set user state from local storage
        }
      }
    };

    handleUser(); // Call the function when the component mounts
  }, [navigate]); // Add navigate as a dependency

  return (
    <div className="fixed left-0 top-0 z-50 w-full flex-wrap items-center place-content-center">
      {/* Ensuring header stays at the top */}
      <header className="flex flex-wrap items-center justify-between bg-white p-4 md:p-5 shadow-md">
        <a href="/" className="text-xl md:text-3xl font-bold">
          To Blog
        </a>

        {/* Add responsive search bar */}
        <div className="w-full md:w-auto">
          <SearchBar />
        </div>

        <div className="flex flex-wrap items-center space-x-3 max-w-full">
          {user ? (
            <>
              <span className="text-md md:text-lg">Hello, {user.username}!</span>
              <Link to={`/user-profile/${user.email}`} className="flex items-center">
                <img
                  src={user.profilePic}
                  alt={`${user.username}'s profile`}
                  className="h-8 w-8 md:h-10 md:w-10 rounded-full"
                />
              </Link>
              <button
                onClick={handleLogout}
                className="flex w-28 md:w-32 items-center justify-center rounded-md bg-red-500 px-4 py-2 text-white transition duration-200 hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={handleGoogleLogin}
              className="flex w-full md:w-44 items-center justify-center rounded-md bg-gradient-to-r from-yellow-800 to-red-700 px-4 py-2 text-white transition duration-200 hover:scale-x-105"
            >
              Login with Google
            </button>
          )}
        </div>
      </header>

      {/* <div className="mt-16"> */}
        {/* Push content down so it doesn't overlap with the fixed header */}
        <CategorySite />
      {/* </div> */}
    </div>
  );
};

export default Header;
