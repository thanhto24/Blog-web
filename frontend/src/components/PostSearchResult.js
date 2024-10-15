import React, { useContext, useEffect, useState } from 'react';
import { PostContext } from '../contexts/PostContext';
import { useParams } from 'react-router-dom';
import ShortPost from '../pages/Home/components/ShortPost';

const PostSearchResult = () => {
  const { search } = useParams();
  const {
    fetchAllPosts,
    fetchPostSearch,
    fetchUserPosts,
    posts,
    postSearch,
    userPosts,
  } = useContext(PostContext);
  const [safePostList, setSafePostList] = useState([]);

  useEffect(() => {
    console.log('Fetching posts based on search term:', search);
    if (search === 'khac') {
      fetchAllPosts();
      setSafePostList(posts);
    } else if (search === 'your-post') {
      fetchUserPosts();
      setSafePostList(userPosts);
    } else {
      fetchPostSearch(search);
      setSafePostList(postSearch);
    }
  }, [search]);

  return (
    <div className="mx-auto mt-10 min-h-screen min-w-max max-w-4xl rounded-lg bg-gray-100 p-4 shadow-md">
      <h2 className="mb-3 text-center text-xl font-semibold text-gray-800">
        Search Results
      </h2>
      <div className="max-h-80 min-h-screen overflow-y-auto">
        {safePostList.length > 0 ? (
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
            {safePostList.map((post) => (
              <div
                key={post._id}
                className="transform-origin-center mx-auto h-full min-h-[150px] w-96 transform rounded-lg border border-gray-300 bg-white p-3 px-2 transition-transform hover:scale-105 hover:shadow-lg"
              >
                <ShortPost post={post} editMode={search==='your-post'}/>
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
  );
};

export default PostSearchResult;
