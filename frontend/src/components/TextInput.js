import React from 'react';

const TextInput = ({ value, onChange, placeholder, required = false }) => {
  return (
    <div className="group relative m-5">
      {' '}
      {/* Add group class for hover effects */}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="relative z-10 block w-full rounded-md border-2 border-gray-300 bg-white py-1 px-2 placeholder-gray-400 transition duration-200 focus:border-blue-500 focus:outline-none hover:cursor-pointer"
        />
      {/* Fill Effect
      <div className="absolute inset-0 z-0 scale-x-0 transform rounded-md bg-blue-500 transition-transform duration-300 group-hover:scale-x-100 group-focus:scale-x-100" /> */}
    </div>
  );
};

export default TextInput;
