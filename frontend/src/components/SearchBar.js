import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission
    console.log('Search query:', query);
    navigate(`/posts/search/${query}`); // Navigate to the search page
    setQuery('');
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center space-x-2">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        aria-label="Search"
        className="rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit" // Make button submit the form
        aria-label="Submit Search"
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
