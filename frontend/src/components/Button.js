import React from 'react';

const Button = ({ label, color = 'blue', onClick }) => {
  const buttonColor = color === 'blue' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600';

  return (
    <button
      onClick={onClick} // Handle click event
      className={`${buttonColor} text-white py-2 px-4 rounded w-full`}
    >
      {label}
    </button>
  );
};

export default Button;
