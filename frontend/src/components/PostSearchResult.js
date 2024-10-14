import React, { useContext, useEffect } from 'react';
import { PostContext } from '../contexts/PostContext';
import { useParams } from 'react-router-dom';
import ShortPost from '../pages/Home/components/ShortPost';

const PostSearchResult = () => {
  const { search } = useParams();
  const { postSearch, fetchPostSearch, posts, fetchAllPosts } =
    useContext(PostContext);

  useEffect(() => {
    console.log('Fetching posts based on search term:', search);
    if (search !== 'khac') {
      fetchPostSearch(search);
    } else {
      fetchAllPosts();
    }
  }, [search]);

  const safePostList = search !== 'khac' ? postSearch : posts;

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
                key={post.id}
                className="mx-auto w-96 min-h-[150px] h-full transform transform-origin-center rounded-lg border border-gray-300 bg-white p-3 px-2 transition-transform hover:scale-105 hover:shadow-lg"
              >
                <ShortPost post={post} />
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
