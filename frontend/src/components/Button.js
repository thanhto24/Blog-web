import React from 'react';

const Button = ({ label, color = 'none', onClick }) => {
  const buttonColor = color === 'none' ? 'bg-slate-800 hover:bg-slate-600' : `bg-${color}-500 hover:bg-${color}-600`;

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
