import React from 'react';

const Header = () => {
  return (
    <header className="flex items-center justify-between p-5">
      <h1 className="text-3xl font-bold">Home</h1>
        <div className="flex items-center">
            <button className="bg-blue-500 text-white px-3 py-1 rounded-md">Login</button>
            <button className="bg-blue-500 text-white px-3 py-1 rounded-md ml-3">Sign Up</button>
        </div>
    </header>
  );
}

export default Header;