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
    window.location.href = 'http://localhost:5000/auth/google'; // Redirect to the backend route for Google login
  };

  // Logout function
  const handleLogout = () => {
    setUser(null); // Reset the user state to null
    setToken(null); // Clear the token from the state
    navigate('/'); // Redirect to home or login page
  };

  // Function to decode the JWT token
  const decodedToken = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/auth/decodeToken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }), // Send token in the body
      });

      // Log the raw response to check if it's JSON or something else
      const textResponse = await response.text();
      console.log('Raw Response:', textResponse);

      // Attempt to parse the response as JSON
      const data = JSON.parse(textResponse); // This line will throw if the response is not JSON
      return data; // Return the parsed JSON data
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  };

  // UseEffect to handle user information based on the token in the URL
  useEffect(() => {
    const handleUser = async () => {
      const params = new URLSearchParams(window.location.search);
      const tokenFromUrl = params.get('token'); // Get the token from the URL

      if (tokenFromUrl) {
        console.log('Token from URL:', tokenFromUrl);
        const decoded = await decodedToken(tokenFromUrl);
        if (decoded) {
          setToken(tokenFromUrl); // Store the token in state
          const user = {
            username: decoded.username,
            profilePic: decoded.profilePic,
          };
          setUser(user); // Set the user state
        }
      }
    };

    handleUser(); // Call the function when the component mounts
  }, []);

  return (
    <div className="sticky left-0 top-0 z-50 block w-full">
      {' '}
      {/* Ensuring header stays at the top */}
      <header className="flex items-center justify-between bg-white p-5 shadow-md">
        <Link to="/" className="text-3xl font-bold">
          Home
        </Link>
        <SearchBar onSearch={(query) => console.log('Searching for:', query)} />
        <div className="flex items-center space-x-3">
          {user ? (
            <>
              <span className="text-lg">Hello, {user.username}!</span>
              <Link to="/user-profile" className="flex items-center">
                <img
                  src={user.profilePic} // Ensure this matches your user object
                  alt={`${user.username}'s profile`}
                  className="h-10 w-10 rounded-full"
                />
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  navigate('/'); // Redirect after logout
                }}
                className="flex w-32 items-center justify-center rounded-md bg-red-500 px-4 py-2 text-white transition duration-200 hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={handleGoogleLogin}
              className="flex w-32 items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-white transition duration-200 hover:bg-blue-600"
            >
              Login with Google
            </button>
          )}
        </div>
      </header>
      <CategorySite />
    </div>
  );
};

export default Header;
