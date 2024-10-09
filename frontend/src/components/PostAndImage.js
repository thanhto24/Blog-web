import React, { useState } from 'react';
import PostCreate from './PostCreate';
import ImageSite from './ImageSite';
import ImageCreate from './ImageCreate';

const PostAndImage = () => {
  const [isFormVisible, setIsFormVisible] = useState(false); // State for controlling the visibility of the form
  const [refreshImages, setRefreshImages] = useState(false); // State to trigger refresh

  const handleRefreshImages = () => {
    setRefreshImages((prev) => !prev); // Toggle refreshImages state to trigger re-fetch
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* PostCreate component */}
          <div className="rounded-lg bg-white p-6 shadow-md lg:col-span-3">
            <h2 className="mb-4 text-2xl font-bold">Create New Post</h2>
            <PostCreate />
          </div>

          {/* ImageSite and ImageCreate components */}
          <div className="flex h-full flex-col rounded-lg bg-white p-6 shadow-md lg:col-span-1">
            <h2 className="mb-4 text-2xl font-bold">Uploaded Images</h2>

            {/* Scrollable ImageSite with dynamic height */}
            <div className="flex-1 overflow-y-auto max-h-[32rem] mb-4">
              <ImageSite refreshImages={refreshImages} />
            </div>

            {/* Upload button pinned to the bottom */}
            <div className="mt-auto flex justify-center">
              {/* Button to show the upload form */}
              {!isFormVisible && (
                <button
                  onClick={() => setIsFormVisible(true)} // Show form
                  className="mb-2 max-h-[4rem] max-w-[10rem] rounded-lg bg-blue-500 px-4 py-2 text-white transition duration-200 hover:bg-blue-600"
                >
                  Upload New Image
                </button>
              )}

              {/* Pass visibility state and function as props to ImageCreate */}
              {isFormVisible && (
                <ImageCreate
                  isFormVisible={isFormVisible}
                  setIsFormVisible={setIsFormVisible}
                  handleRefreshImages={handleRefreshImages} // Pass refresh function
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostAndImage;
