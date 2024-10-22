import React, { useContext, useEffect, useState } from 'react';
import { PostContext } from '../contexts/PostContext';
import { useParams } from 'react-router-dom';
import ShortPost from '../pages/Home/components/ShortPost';
import Breadcrumb from './Breadcrumb';

const PostSearchResult = () => {
  const breadcrumbPaths = [
    { label: 'Home', url: '/' },
    { label: 'Results', url: '' }, // Example path
  ];
  
  const { search } = useParams();
  const {
    fetchAllPosts,
    fetchPostSearch,
    fetchUserPosts,
    fetchUserLikedPosts,
    posts,
    postSearch,
    userPosts,
    userLikedPosts,
  } = useContext(PostContext);
  
  const [safePostList, setSafePostList] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      console.log('Fetching posts based on search term:', search);

      if (search === 'khac') {
        console.log('Fetching all posts');
        // Ensure posts are loaded before setting
        setSafePostList(posts.length ? posts : await fetchAllPosts());
      } else if (search === 'your-post') {
        setSafePostList(userPosts.length ? userPosts : await fetchUserPosts());
      } else if (search === 'liked-posts') {
        setSafePostList(userLikedPosts.length ? userLikedPosts : await fetchUserLikedPosts());
      } else {
        setSafePostList(postSearch.length ? postSearch : await fetchPostSearch(search));
      }
    };

    fetchPosts(); // Call the asynchronous function

    return () => {};
  }, [search, posts, userPosts, userLikedPosts, postSearch]);

  return (
    <div>
      <Breadcrumb paths={breadcrumbPaths} />
        <h2 className="mb-3 text-center text-3xl font-semibold text-gray-800">
          Search Results
        </h2>
      <div className="mx-auto mt-10 mb-10 min-h-screen min-w-max max-w-4xl rounded-lg bg-gray-100 p-4 shadow-md">
        <div className="max-h-80 min-h-screen overflow-y-auto scroll-hidden my-10">
          {safePostList ? (
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
              {safePostList.map((post) => (
                <div
                  key={post._id}
                  className="transform-origin-center mx-auto h-full min-h-[150px] w-96 transform rounded-lg border border-gray-300 bg-white p-3 px-2 transition-transform hover:scale-105 hover:shadow-lg"
                >
                  <ShortPost post={post} editMode={search === 'your-post'} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <p className="text-xl italic text-gray-600">
                No posts found for the search term: "
                <span className="font-semibold">{search}</span>"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(PostSearchResult);
