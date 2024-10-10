import React, { useContext, useEffect } from 'react';
import { PostContext } from '../../../contexts/PostContext';
import ShortPost from '../../Home/components/ShortPost';

const ListPostRecommend = ({currentPost, relatedData }) => {
  const { relatedPosts, fetchRelatedPosts, posts } = useContext(PostContext);

  useEffect(() => {
    fetchRelatedPosts(relatedData); // Fetch related posts when relatedData changes
  }, [relatedData]);

  let postData = [...relatedPosts]; // Create a new array from relatedPosts
  
  const n = postData.length;

  // If there are less than 10 posts, add more from the posts array
  if (n < 10) {
    const additionalPosts = posts.slice(0, 10 - n);
    postData = postData.concat(additionalPosts); // Combine relatedPosts and additional posts
  }

  // Remove duplicates based on the unique identifier (_id)
  let uniquePosts = Array.from(new Set(postData.map(post => post._id)))
    .map(id => postData.find(post => post._id === id));

  uniquePosts = uniquePosts.filter(post => post._id !== currentPost._id); // Remove the current post


  return (
    <div className="mt-4 rounded-lg bg-white p-4 shadow-md">
      <h2 className="mb-4 text-xl font-semibold">Recommended Posts</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {uniquePosts.slice(0, 3).map((post) => ( // Limit to a maximum of 10 unique posts
          <ShortPost key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default ListPostRecommend;
