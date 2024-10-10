import React, { useContext, useEffect } from 'react';
import PopularPost from './components/PopularPost';
// import PostList from '../../components/PostList';
import ShortPost from './components/ShortPost';
import { PostContext } from '../../contexts/PostContext';
import OtherFeature from './components/OtherFeature';

const Home = () => {
  const { fetchAllPosts, posts } = useContext(PostContext);

  useEffect(() => {
    fetchAllPosts(); // Fetch posts when the component mounts
  }, []);

  const n = posts.length;
  return (
    <>
      <div className="grid grid-cols-10 gap-4">
        {/* PopularPost takes 7/10 (70%) */}
        <div className="col-span-7">
          <PopularPost listPost={posts.slice(0, 6)} />
        </div>

        {/* ShortPost takes 3/10 (30%) */}
        <div className="col-span-3 h-screen space-y-4 overflow-y-scroll bg-red-200 p-5">
          <h1 className="mb-5 text-3xl font-bold">Newest Post</h1>
          {posts.map((post) => (
            <ShortPost key={post.id} post={post} />
          ))}
        </div>
      </div>
      <div className="mt-10 bg-orange-200 p-5">
        <OtherFeature />
      </div>
    </>
  );
};

export default Home;
