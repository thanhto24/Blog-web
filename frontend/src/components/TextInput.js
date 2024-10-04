import React from 'react';

const TextInput = ({ value, onChange, placeholder, required = false }) => {
  return (
    <div className="relative m-5">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="relative z-10 block w-full rounded-md border-2 border-gray-300 bg-white p-2 placeholder-gray-400 transition duration-200 focus:border-transparent focus:outline-none"
      />
      {/* Fill Effect */}
      <div className="absolute inset-0 z-0 bg-blue-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
    </div>
  );
};

export default TextInput;
