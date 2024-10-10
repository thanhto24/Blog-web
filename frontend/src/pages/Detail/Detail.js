import React, {useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ListPostRecommend from './components/ListPostRecommend';
import PostDetail from '../../components/PostDetail';
import { PostContext } from '../../contexts/PostContext';

const Detail = () => {
  const { id } = useParams();
  const { postWithId, fetchPostById } = useContext(PostContext);

  useEffect(() => {
    fetchPostById(id);
  }, [id]);

  let relatedData = postWithId.tags;
  console.log(relatedData);
  return (
    <div>
      {/* <PostProvider> */}

      <PostDetail post={postWithId} />
      <ListPostRecommend relatedData={relatedData} currentPost={postWithId}/>
      {/* </PostProvider> */}
    </div>
  );
};

export default Detail;
