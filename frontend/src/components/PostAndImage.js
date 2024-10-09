import React from 'react';
import PostCreate from './PostCreate';
import ImageSite from './ImageSite';
import ImageCreate from './ImageCreate';

const PostAndImage = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="container mx-auto">
        {/* Layout with 2 columns: PostCreate takes 70-80% of the width, ImageSite takes 20-30% */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* PostCreate markdown editor takes 3 out of 4 columns (approx. 75%) */}
          <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
            <PostCreate />
          </div>

          {/* ImageSite component takes 1 out of 4 columns (approx. 25%) */}
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-4">Uploaded Images</h2>

            {/* Scrollable ImageSite with a taller max height to show more images */}
            <div className="flex-1 overflow-y-auto max-h-[33rem] mb-4">
              <ImageSite />
            </div>

            {/* Upload button pinned to the bottom */}
            <div className="mt-auto">
              <ImageCreate />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostAndImage;
