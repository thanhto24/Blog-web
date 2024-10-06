import React, { useContext, useEffect } from 'react';
import { PostContext } from '../../../contexts/PostContext';

const ListPostRecommend = () => {
  const { relatedPosts, fetchRelatedPosts } = useContext(PostContext);

  useEffect(() => {
    fetchRelatedPosts(); // This will trigger only once
  }, []); // Empty dependency array to ensure it runs only once when the component mounts

  return (
    <div>
      <h2>Recommended Posts</h2>
      {relatedPosts.length === 0 ? (
        <p>No related posts found.</p>    
      ) : (
        <ul>
          {relatedPosts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListPostRecommend;
