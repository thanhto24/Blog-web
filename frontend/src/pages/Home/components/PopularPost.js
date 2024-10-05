import React from 'react';

const PopularPost = () => {
  return (
    <div className="flex items-center justify-between p-5">
      <h1 className="text-3xl font-bold">Popular Post</h1>
      <button className="bg-blue-500 text-white px-3 py-1 rounded-md">View All</button>
    </div>
  );
}

export default PopularPost;